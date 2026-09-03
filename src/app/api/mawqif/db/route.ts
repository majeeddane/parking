import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function getSupabase() {
  return createClient(supabaseUrl, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// =============================================
// GET: Return all users + applications + notifications
// =============================================
export async function GET() {
  try {
    const supabase = getSupabase();

    const { data: users, error: uErr } = await supabase
      .from('mawqif_users')
      .select('*')
      .order('created_at', { ascending: false });

    if (uErr) throw uErr;

    const { data: apps, error: aErr } = await supabase
      .from('mawqif_applications')
      .select('*')
      .order('created_at', { ascending: false });

    if (aErr) throw aErr;

    const { data: notifs, error: nErr } = await supabase
      .from('mawqif_notifications')
      .select('*')
      .order('created_at', { ascending: false });

    if (nErr) throw nErr;

    // Reconstruct the unified shape: userId -> { user, application, notifications }
    const db: Record<string, any> = {};

    // 1. Process all registered users
    for (const u of users || []) {
      const userApp = (apps || []).find((a: any) => a.user_id === u.id) || null;
      const userNotifs = (notifs || [])
        .filter((n: any) => n.user_id === u.id)
        .map((n: any) => ({
          id: n.id,
          title: n.title,
          desc: n.description,
          time: n.time_label,
          read: n.is_read,
        }));

      db[u.id] = {
        user: {
          id: u.id,
          firstName: u.first_name,
          fatherName: u.father_name,
          familyName: u.family_name,
          fullName: u.full_name,
          idNumber: u.id_number,
          phone: u.phone,
          email: u.email,
          city: u.city,
          address: u.address,
          dateOfBirth: u.date_of_birth,
          password: u.password_hash,
        },
        application: userApp
          ? {
              id: userApp.id,
              submissionDate: userApp.submission_date,
              status: userApp.status,
              vehicleMake: userApp.vehicle_make,
              vehicleModel: userApp.vehicle_model,
              vehicleYear: userApp.vehicle_year,
              vehicleColor: userApp.vehicle_color,
              plateNumber: userApp.plate_number,
              vehicleLicenseNumber: userApp.vehicle_license_number,
              isOwner: userApp.is_owner,
              ownerRelation: userApp.owner_relation,
              rejectionReason: userApp.rejection_reason,
              subscriptionNumber: userApp.subscription_number,
              subscriptionStartDate: userApp.subscription_start,
              subscriptionEndDate: userApp.subscription_end,
              documents: {
                idDocument: userApp.doc_id_document,
                drivingLicense: userApp.doc_driving_license,
                vehicleLicense: userApp.doc_vehicle_license,
                carPhoto: userApp.doc_car_photo,
              },
            }
          : null,
        notifications: userNotifs,
      };
    }

    // 2. Also ensure any application whose user wasn't in users is preserved
    for (const a of apps || []) {
      const alreadyLinked = Object.values(db).some((acc: any) => acc.application?.id === a.id);
      if (!alreadyLinked) {
        const tempKey = a.user_id || a.id;
        db[tempKey] = {
          user: {
            id: a.user_id || tempKey,
            fullName: 'مقدم طلب',
            idNumber: '—',
            phone: '—',
            email: '—',
          },
          application: {
            id: a.id,
            submissionDate: a.submission_date,
            status: a.status,
            vehicleMake: a.vehicle_make,
            vehicleModel: a.vehicle_model,
            vehicleYear: a.vehicle_year,
            vehicleColor: a.vehicle_color,
            plateNumber: a.plate_number,
            vehicleLicenseNumber: a.vehicle_license_number,
            isOwner: a.is_owner,
            ownerRelation: a.owner_relation,
            rejectionReason: a.rejection_reason,
            subscriptionNumber: a.subscription_number,
            subscriptionStartDate: a.subscription_start,
            subscriptionEndDate: a.subscription_end,
            documents: {
              idDocument: a.doc_id_document,
              drivingLicense: a.doc_driving_license,
              vehicleLicense: a.doc_vehicle_license,
              carPhoto: a.doc_car_photo,
            },
          },
          notifications: [],
        };
      }
    }

    return NextResponse.json({ success: true, data: db }, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error: any) {
    console.error('Supabase GET Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// =============================================
// Helper: Safe User Upsert
// =============================================
async function safeUpsertUser(supabase: any, u: any) {
  if (!u?.id) return null;

  // Check if a user with this id_number or phone already exists
  let targetId = u.id;
  if (u.idNumber) {
    const { data: existingById } = await supabase
      .from('mawqif_users')
      .select('id')
      .eq('id_number', u.idNumber)
      .maybeSingle();
    if (existingById?.id) {
      targetId = existingById.id;
    }
  }

  const { data, error } = await supabase
    .from('mawqif_users')
    .upsert({
      id: targetId,
      first_name: u.firstName || null,
      father_name: u.fatherName || null,
      family_name: u.familyName || null,
      full_name: u.fullName || `${u.firstName || ''} ${u.familyName || ''}`.trim() || 'مستخدم مواقف',
      id_number: u.idNumber || null,
      phone: u.phone || null,
      email: u.email || null,
      city: u.city || 'الرياض',
      address: u.address || null,
      date_of_birth: u.dateOfBirth || null,
      password_hash: u.password || null,
    }, { onConflict: 'id' })
    .select('id')
    .single();

  if (error) {
    console.error('SafeUpsertUser error:', error);
  }
  return targetId;
}

// =============================================
// Helper: Safe Application Upsert
// =============================================
async function safeUpsertApplication(supabase: any, a: any, userId: string) {
  if (!a?.id) return;

  const { error } = await supabase
    .from('mawqif_applications')
    .upsert({
      id: a.id,
      user_id: userId,
      submission_date: a.submissionDate || new Date().toLocaleDateString('ar-SA'),
      status: a.status || 'pending',
      vehicle_make: a.vehicleMake || null,
      vehicle_model: a.vehicleModel || null,
      vehicle_year: a.vehicleYear || null,
      vehicle_color: a.vehicleColor || null,
      plate_number: a.plateNumber || null,
      vehicle_license_number: a.vehicleLicenseNumber || null,
      is_owner: a.isOwner || 'yes',
      owner_relation: a.ownerRelation || 'owner',
      rejection_reason: a.rejectionReason || null,
      subscription_number: a.subscriptionNumber || a.id,
      subscription_start: a.subscriptionStartDate || null,
      subscription_end: a.subscriptionEndDate || null,
      doc_id_document: a.documents?.idDocument || null,
      doc_driving_license: a.documents?.drivingLicense || null,
      doc_vehicle_license: a.documents?.vehicleLicense || null,
      doc_car_photo: a.documents?.carPhoto || null,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'id' });

  if (error) {
    console.error('SafeUpsertApplication error:', error);
  }
}

// =============================================
// POST: Handle all write operations
// =============================================
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabase();
    const body = await request.json();
    const { action } = body;

    // ---- 1. SAVE / UPSERT A USER RECORD (User + App + Notifs) ----
    if (action === 'save_user') {
      const { record } = body;
      if (!record?.user?.id) {
        return NextResponse.json({ success: false, error: 'Missing user.id' }, { status: 400 });
      }

      const userId = await safeUpsertUser(supabase, record.user);

      if (record.application && userId) {
        await safeUpsertApplication(supabase, record.application, userId);
      }

      if (record.notifications?.length && userId) {
        await supabase.from('mawqif_notifications').delete().eq('user_id', userId);
        const notifsToInsert = record.notifications.map((n: any) => ({
          user_id: userId,
          title: n.title,
          description: n.desc || n.description,
          time_label: n.time || n.time_label || 'الآن',
          is_read: n.read ?? n.is_read ?? false,
        }));
        await supabase.from('mawqif_notifications').insert(notifsToInsert);
      }

      return NextResponse.json({ success: true, userId });
    }

    // ---- 2. SAVE APPLICATION DIRECTLY ----
    if (action === 'save_application') {
      const { application, user } = body;
      if (!application?.id) {
        return NextResponse.json({ success: false, error: 'Missing application.id' }, { status: 400 });
      }

      let userId = user?.id || application.userId || 'usr_guest';
      if (user?.id) {
        const upsertedId = await safeUpsertUser(supabase, user);
        if (upsertedId) userId = upsertedId;
      }

      await safeUpsertApplication(supabase, application, userId);
      return NextResponse.json({ success: true, applicationId: application.id });
    }

    // ---- 3. SYNC ALL ACCOUNTS ----
    if (action === 'sync_all') {
      const { allAccounts } = body;
      if (!allAccounts) return NextResponse.json({ success: true });

      for (const userId of Object.keys(allAccounts)) {
        try {
          const record = allAccounts[userId];
          if (!record?.user?.id) continue;

          const savedUserId = await safeUpsertUser(supabase, record.user);
          if (record.application && savedUserId) {
            await safeUpsertApplication(supabase, record.application, savedUserId);
          }
        } catch (itemErr) {
          console.error(`Error syncing account ${userId}:`, itemErr);
        }
      }

      return NextResponse.json({ success: true });
    }

    // ---- 4. UPDATE APPLICATION STATUS (Admin action) ----
    if (action === 'update_status') {
      const { appId, newStatus, extraFields, notification } = body;

      const updateData: any = {
        status: newStatus,
        updated_at: new Date().toISOString(),
      };

      if (extraFields?.rejectionReason)       updateData.rejection_reason    = extraFields.rejectionReason;
      if (extraFields?.subscriptionNumber)    updateData.subscription_number = extraFields.subscriptionNumber;
      if (extraFields?.subscriptionStartDate) updateData.subscription_start  = extraFields.subscriptionStartDate;
      if (extraFields?.subscriptionEndDate)   updateData.subscription_end    = extraFields.subscriptionEndDate;

      const { data: appRow, error: aErr } = await supabase
        .from('mawqif_applications')
        .update(updateData)
        .or(`id.eq.${appId},subscription_number.eq.${appId}`)
        .select('user_id')
        .single();

      if (aErr) throw aErr;

      // Add notification to the user
      if (notification && appRow?.user_id) {
        await supabase.from('mawqif_notifications').insert({
          user_id: appRow.user_id,
          title: notification.title,
          description: notification.desc,
          time_label: notification.time || 'الآن',
          is_read: false,
        });
      }

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Supabase POST Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
