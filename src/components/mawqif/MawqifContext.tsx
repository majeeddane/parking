'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface MawqifUser {
  id: string;
  firstName: string;
  fatherName: string;
  familyName: string;
  fullName: string;
  idNumber: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  dateOfBirth?: string;
  password?: string;
}

export interface UserApplication {
  id: string;
  submissionDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'needs_edit' | 'completed';
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehicleColor: string;
  plateNumber: string;
  vehicleLicenseNumber: string;
  isOwner: string;
  ownerRelation?: string;
  rejectionReason?: string;
  subscriptionNumber?: string;
  subscriptionStartDate?: string;
  subscriptionEndDate?: string;
}

export interface NotificationItem {
  id: number;
  title: string;
  desc: string;
  time: string;
  read: boolean;
}

interface AccountRecord {
  user: MawqifUser;
  application: UserApplication | null;
  notifications: NotificationItem[];
}

interface MawqifContextType {
  currentUser: MawqifUser | null;
  isLoggedIn: boolean;
  userApplication: UserApplication | null;
  notifications: NotificationItem[];
  login: (identifier: string, password?: string) => { success: boolean; error?: string };
  register: (user: Partial<MawqifUser>, password?: string) => { success: boolean; error?: string };
  logout: () => void;
  submitApplication: (data: any) => string;
  updateProfile: (data: Partial<MawqifUser>) => void;
  markNotificationsRead: () => void;
}

const MawqifContext = createContext<MawqifContextType | undefined>(undefined);

export function MawqifProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<MawqifUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userApplication, setUserApplication] = useState<UserApplication | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load active session from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const activeUserId = localStorage.getItem('mawqif_active_user_id');
    const accountsStr = localStorage.getItem('mawqif_accounts_db');

    if (activeUserId && accountsStr) {
      try {
        const accounts: Record<string, AccountRecord> = JSON.parse(accountsStr);
        const activeAcc = accounts[activeUserId];
        if (activeAcc && activeAcc.user) {
          setCurrentUser(activeAcc.user);
          setUserApplication(activeAcc.application || null);
          setNotifications(activeAcc.notifications || []);
          setIsLoggedIn(true);
        }
      } catch (e) {
        console.error('Error loading session', e);
      }
    }
  }, []);

  // Helper to persist accounts DB
  const getAccountsDB = (): Record<string, AccountRecord> => {
    try {
      const dbStr = localStorage.getItem('mawqif_accounts_db');
      return dbStr ? JSON.parse(dbStr) : {};
    } catch {
      return {};
    }
  };

  const saveAccountsDB = (db: Record<string, AccountRecord>) => {
    localStorage.setItem('mawqif_accounts_db', JSON.stringify(db));
  };

  const login = (identifier: string, password?: string): { success: boolean; error?: string } => {
    const cleanId = identifier.trim().toLowerCase();
    const cleanPhone = cleanId.replace(/\s+/g, '').replace(/^(\+966|00966)/, '0');
    const cleanPass = (password || '').trim();

    if (!cleanId) {
      return { success: false, error: 'يرجى إدخال رقم الجوال أو البريد الإلكتروني أو رقم الهوية.' };
    }

    const db = getAccountsDB();
    const accountList = Object.values(db);

    // Find account by phone, email, or idNumber
    const foundAcc = accountList.find((acc) => {
      const uPhone = (acc.user.phone || '').trim().replace(/\s+/g, '').replace(/^(\+966|00966)/, '0');
      const uEmail = (acc.user.email || '').trim().toLowerCase();
      const uIdNum = (acc.user.idNumber || '').trim();

      return (
        (uEmail && uEmail === cleanId) ||
        (uPhone && (uPhone === cleanId || uPhone === cleanPhone)) ||
        (uIdNum && uIdNum === cleanId)
      );
    });

    if (!foundAcc) {
      return {
        success: false,
        error: 'لا يوجد حساب مسجل بهذه البيانات. يرجى إنشاء حساب جديد أولاً.',
      };
    }

    // Verify password if provided
    const userStoredPassword = (foundAcc.user.password || '').trim();
    if (cleanPass && userStoredPassword && userStoredPassword !== cleanPass) {
      return {
        success: false,
        error: 'كلمة المرور غير صحيحة. يرجى التأكد وإعادة المحاولة.',
      };
    }

    // Login successful
    setCurrentUser(foundAcc.user);
    setUserApplication(foundAcc.application || null);
    setNotifications(foundAcc.notifications || []);
    setIsLoggedIn(true);
    localStorage.setItem('mawqif_active_user_id', foundAcc.user.id);

    return { success: true };
  };

  const register = (data: Partial<MawqifUser>, password?: string): { success: boolean; error?: string } => {
    const db = getAccountsDB();
    const accountList = Object.values(db);

    const cleanEmail = (data.email || '').trim().toLowerCase();
    const cleanPhone = (data.phone || '').trim().replace(/\s+/g, '');
    const cleanIdNumber = (data.idNumber || '').trim();

    // Check if ID or phone or email already registered
    const existing = accountList.find((acc) => {
      const uPhone = (acc.user.phone || '').trim().replace(/\s+/g, '');
      const uEmail = (acc.user.email || '').trim().toLowerCase();
      const uIdNum = (acc.user.idNumber || '').trim();

      return (
        (cleanIdNumber && uIdNum === cleanIdNumber) ||
        (cleanPhone && uPhone === cleanPhone) ||
        (cleanEmail && uEmail === cleanEmail)
      );
    });

    if (existing) {
      return {
        success: false,
        error: 'يوجد حساب مسجل بالفعل برقم الهوية أو الجوال أو البريد المدخل. يرجى تسجيل الدخول بدلاً من ذلك.',
      };
    }

    const userId = `usr_${Date.now()}`;
    const fullName = `${data.firstName || ''} ${data.fatherName || ''} ${data.familyName || ''}`.trim() || data.fullName || 'مستخدم جديد';
    const userPassword = (password || data.password || '123456').trim();

    const newUser: MawqifUser = {
      id: userId,
      firstName: (data.firstName || '').trim(),
      fatherName: (data.fatherName || '').trim(),
      familyName: (data.familyName || '').trim(),
      fullName,
      idNumber: cleanIdNumber,
      phone: cleanPhone,
      email: cleanEmail,
      city: data.city || 'الرياض',
      address: data.address || '',
      dateOfBirth: data.dateOfBirth || '',
      password: userPassword,
    };

    const initialNotifs: NotificationItem[] = [
      {
        id: Date.now(),
        title: `أهلاً بك يا ${newUser.firstName} في برنامج مواقف 👋`,
        desc: 'تم تفعيل حسابك بنجاح! يمكنك الآن التقديم للحصول على اشتراك مجاني في المواقف لمدة 12 شهرًا.',
        time: 'الآن',
        read: false,
      },
    ];

    const newRecord: AccountRecord = {
      user: newUser,
      application: null, // Empty until the user applies
      notifications: initialNotifs,
    };

    db[userId] = newRecord;
    saveAccountsDB(db);

    // Activate session
    setCurrentUser(newUser);
    setUserApplication(null);
    setNotifications(initialNotifs);
    setIsLoggedIn(true);
    localStorage.setItem('mawqif_active_user_id', userId);

    return { success: true };
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUserApplication(null);
    setNotifications([]);
    localStorage.removeItem('mawqif_active_user_id');
  };

  const submitApplication = (formData: any) => {
    if (!currentUser) return '';

    const randomId = `PARK-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const newApp: UserApplication = {
      id: randomId,
      submissionDate: new Date().toLocaleDateString('ar-SA', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'pending',
      vehicleMake: formData.carMake,
      vehicleModel: formData.carModel,
      vehicleYear: formData.carYear,
      vehicleColor: formData.carColor,
      plateNumber: formData.plateNumber,
      vehicleLicenseNumber: formData.vehicleLicenseNumber,
      isOwner: formData.isOwner,
      ownerRelation: formData.ownerRelation,
    };

    const newNotif: NotificationItem = {
      id: Date.now(),
      title: `تم إرسال طلب الاشتراك بنجاح (${randomId}) 📄`,
      desc: 'تم استلام طلبك ومستنداتك بنجاح وجارٍ مراجعتها من قبل فريق التدقيق.',
      time: 'الآن',
      read: false,
    };

    const updatedNotifs = [newNotif, ...notifications];

    setUserApplication(newApp);
    setNotifications(updatedNotifs);

    // Update in DB
    const db = getAccountsDB();
    if (db[currentUser.id]) {
      db[currentUser.id].application = newApp;
      db[currentUser.id].notifications = updatedNotifs;
      saveAccountsDB(db);
    }

    return randomId;
  };

  const updateProfile = (data: Partial<MawqifUser>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...data };
    setCurrentUser(updatedUser);

    const db = getAccountsDB();
    if (db[currentUser.id]) {
      db[currentUser.id].user = updatedUser;
      saveAccountsDB(db);
    }
  };

  const markNotificationsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    if (currentUser) {
      const db = getAccountsDB();
      if (db[currentUser.id]) {
        db[currentUser.id].notifications = updated;
        saveAccountsDB(db);
      }
    }
  };

  return (
    <MawqifContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        userApplication,
        notifications,
        login,
        register,
        logout,
        submitApplication,
        updateProfile,
        markNotificationsRead,
      }}
    >
      {children}
    </MawqifContext.Provider>
  );
}

export function useMawqif() {
  const context = useContext(MawqifContext);
  if (!context) {
    throw new Error('useMawqif must be used within a MawqifProvider');
  }
  return context;
}
