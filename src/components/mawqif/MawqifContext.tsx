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

interface MawqifContextType {
  currentUser: MawqifUser | null;
  isLoggedIn: boolean;
  userApplication: UserApplication | null;
  notifications: NotificationItem[];
  login: (identifier: string) => boolean;
  register: (user: Partial<MawqifUser>) => boolean;
  logout: () => void;
  submitApplication: (data: any) => string;
  updateProfile: (data: Partial<MawqifUser>) => void;
  markNotificationsRead: () => void;
}

const DEFAULT_USER: MawqifUser = {
  id: 'usr-101',
  firstName: 'محمد',
  fatherName: 'أحمد',
  familyName: 'العتيبي',
  fullName: 'محمد أحمد العتيبي',
  idNumber: '1082345678',
  phone: '0501234567',
  email: 'm.otaibi@example.com',
  city: 'الرياض',
  address: 'حي النرجس، شارع أنس بن مالك',
  dateOfBirth: '1995-06-15',
};

const DEFAULT_APP: UserApplication = {
  id: 'PARK-2026-10482',
  submissionDate: '28 أغسطس 2026',
  status: 'approved',
  vehicleMake: 'تويوتا (Toyota)',
  vehicleModel: 'Camry',
  vehicleYear: '2024',
  vehicleColor: 'أبيض لؤلؤي',
  plateNumber: 'أ ب ج 1234',
  vehicleLicenseNumber: '2049182390',
  isOwner: 'yes',
  subscriptionNumber: 'PARK-2026-10482',
  subscriptionStartDate: '01 سبتمبر 2026',
  subscriptionEndDate: '31 أغسطس 2027',
};

const DEFAULT_NOTIFS: NotificationItem[] = [
  {
    id: 1,
    title: 'تم إصدار بطاقة اشتراكك الرقمية بنجاح 🟢',
    desc: 'يسرنا إبلاغك بجاهزية بطاقة اشتراكك في مواقف السيارات لمدة سنة كاملة. يمكنك استخدام رمز QR للدخول المباشر.',
    time: 'قبل ساعتين',
    read: false,
  },
  {
    id: 2,
    title: 'تمت الموافقة على طلب الاشتراك الخاص بك 🎉',
    desc: 'تم الانتهاء من مراجعة بياناتك ومستنداتك للطلب رقم PARK-2026-10482 واعتماد الأهلية.',
    time: 'أمس - 09:00 ص',
    read: true,
  },
  {
    id: 3,
    title: 'تم استلام وتوثيق مستندات الطلب 📄',
    desc: 'تم استلام الهوية الوطنية ورخص القيادة والسير وجارٍ تحويلها لفريق التدقيق.',
    time: '28 أغسطس 2026',
    read: true,
  },
];

const MawqifContext = createContext<MawqifContextType | undefined>(undefined);

export function MawqifProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<MawqifUser | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userApplication, setUserApplication] = useState<UserApplication | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedUser = localStorage.getItem('mawqif_user');
    const savedApp = localStorage.getItem('mawqif_app');
    const savedNotifs = localStorage.getItem('mawqif_notifs');
    const savedAuth = localStorage.getItem('mawqif_auth');

    if (savedAuth === 'true' && savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
        setIsLoggedIn(true);
        if (savedApp) setUserApplication(JSON.parse(savedApp));
        if (savedNotifs) setNotifications(JSON.parse(savedNotifs));
      } catch (e) {
        console.error('Failed to parse saved user', e);
      }
    }
  }, []);

  const login = (identifier: string) => {
    // Check if we have registered user or use fallback
    const savedUserStr = localStorage.getItem('mawqif_user');
    let userToLog: MawqifUser = DEFAULT_USER;
    if (savedUserStr) {
      try {
        const parsed = JSON.parse(savedUserStr);
        if (parsed.email === identifier || parsed.phone === identifier || parsed.idNumber === identifier) {
          userToLog = parsed;
        }
      } catch (e) {}
    } else {
      userToLog = {
        ...DEFAULT_USER,
        phone: identifier.startsWith('05') ? identifier : DEFAULT_USER.phone,
        email: identifier.includes('@') ? identifier : DEFAULT_USER.email,
      };
    }

    setCurrentUser(userToLog);
    setIsLoggedIn(true);
    setUserApplication(DEFAULT_APP);
    setNotifications(DEFAULT_NOTIFS);

    localStorage.setItem('mawqif_auth', 'true');
    localStorage.setItem('mawqif_user', JSON.stringify(userToLog));
    localStorage.setItem('mawqif_app', JSON.stringify(DEFAULT_APP));
    localStorage.setItem('mawqif_notifs', JSON.stringify(DEFAULT_NOTIFS));
    return true;
  };

  const register = (data: Partial<MawqifUser>) => {
    const fullName = `${data.firstName || ''} ${data.fatherName || ''} ${data.familyName || ''}`.trim() || data.fullName || 'مستخدم مواقف';
    const newUser: MawqifUser = {
      id: `usr-${Date.now().toString().slice(-4)}`,
      firstName: data.firstName || '',
      fatherName: data.fatherName || '',
      familyName: data.familyName || '',
      fullName,
      idNumber: data.idNumber || '',
      phone: data.phone || '',
      email: data.email || '',
      city: data.city || 'الرياض',
      address: data.address || '',
      dateOfBirth: data.dateOfBirth || '',
    };

    setCurrentUser(newUser);
    setIsLoggedIn(true);
    setUserApplication(null); // Fresh registration has no application yet!
    setNotifications([
      {
        id: Date.now(),
        title: 'مرحبًا بك في منصة مواقف 👋',
        desc: 'تم إنشاء حسابك بنجاح! يمكنك الآن التقديم للحصول على اشتراك مجاني في المواقف لمدة سنة.',
        time: 'الآن',
        read: false,
      },
    ]);

    localStorage.setItem('mawqif_auth', 'true');
    localStorage.setItem('mawqif_user', JSON.stringify(newUser));
    localStorage.removeItem('mawqif_app');
    return true;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setUserApplication(null);
    localStorage.removeItem('mawqif_auth');
  };

  const submitApplication = (formData: any) => {
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

    setUserApplication(newApp);
    localStorage.setItem('mawqif_app', JSON.stringify(newApp));

    const newNotif: NotificationItem = {
      id: Date.now(),
      title: `تم إرسال طلب الاشتراك بنجاح (${randomId}) 📄`,
      desc: 'تم استلام طلبك ومستنداتك وجارٍ تحويلها لفريق التدقيق للمراجعة والاعتماد.',
      time: 'الآن',
      read: false,
    };
    const updatedNotifs = [newNotif, ...notifications];
    setNotifications(updatedNotifs);
    localStorage.setItem('mawqif_notifs', JSON.stringify(updatedNotifs));

    return randomId;
  };

  const updateProfile = (data: Partial<MawqifUser>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    localStorage.setItem('mawqif_user', JSON.stringify(updated));
  };

  const markNotificationsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('mawqif_notifs', JSON.stringify(updated));
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
