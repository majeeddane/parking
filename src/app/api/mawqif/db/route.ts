import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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

    // Reconstruct the same shape as localStorage (userId -> { user, application, notifications })
    const db: Record<string, any> = {};

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

    return NextResponse.json({ success: true, data: db });
  } catch (error: any) {
    console.error('Supabase GET Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
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

    // ---- SAVE / UPSERT A USER RECORD ----
    if (action === 'save_user') {
      const { record } = body;
      if (!record?.user?.id) {
        return NextResponse.json({ success: false, error: 'Missing user.id' }, { status: 400 });
      }
      const u = record.user;

      // Upsert user
      const { error: uErr } = await supabase
        .from('mawqif_users')
        .upsert({
          id: u.id,
          first_name: u.firstName,
          father_name: u.fatherName,
          family_name: u.familyName,
          full_name: u.fullName,
          id_number: u.idNumber,
          phone: u.phone,
          email: u.email,
          city: u.city,
          address: u.address,
          date_of_birth: u.dateOfBirth,
          password_hash: u.password,
        }, { onConflict: 'id' });

      if (uErr) throw uErr;

      // Upsert application if present
      if (record.application) {
        const a = record.application;
        const { error: aErr } = await supabase
          .from('mawqif_applications')
          .upsert({
            id: a.id,
            user_id: u.id,
            submission_date: a.submissionDate,
            status: a.status,
            vehicle_make: a.vehicleMake,
            vehicle_model: a.vehicleModel,
            vehicle_year: a.vehicleYear,
            vehicle_color: a.vehicleColor,
            plate_number: a.plateNumber,
            vehicle_license_number: a.vehicleLicenseNumber,
            is_owner: a.isOwner,
            owner_relation: a.ownerRelation,
            rejection_reason: a.rejectionReason,
            subscription_number: a.subscriptionNumber,
            subscription_start: a.subscriptionStartDate,
            subscription_end: a.subscriptionEndDate,
            doc_id_document: a.documents?.idDocument || null,
            doc_driving_license: a.documents?.drivingLicense || null,
            doc_vehicle_license: a.documents?.vehicleLicense || null,
            doc_car_photo: a.documents?.carPhoto || null,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'id' });

        if (aErr) throw aErr;
      }

      // Upsert notifications
      if (record.notifications?.length) {
        // Delete old then insert
        await supabase.from('mawqif_notifications').delete().eq('user_id', u.id);
        const notifsToInsert = record.notifications.map((n: any) => ({
          user_id: u.id,
          title: n.title,
          description: n.desc,
          time_label: n.time,
          is_read: n.read,
        }));
        const { error: nErr } = await supabase.from('mawqif_notifications').insert(notifsToInsert);
        if (nErr) throw nErr;
      }

      return NextResponse.json({ success: true });
    }

    // ---- SYNC ALL ACCOUNTS ----
    if (action === 'sync_all') {
      const { allAccounts } = body;
      if (!allAccounts) return NextResponse.json({ success: true });

      for (const userId of Object.keys(allAccounts)) {
        const record = allAccounts[userId];
        if (!record?.user?.id) continue;
        const u = record.user;

        await supabase.from('mawqif_users').upsert({
          id: u.id,
          first_name: u.firstName,
          father_name: u.fatherName,
          family_name: u.familyName,
          full_name: u.fullName,
          id_number: u.idNumber,
          phone: u.phone,
          email: u.email,
          city: u.city,
          address: u.address,
          date_of_birth: u.dateOfBirth,
          password_hash: u.password,
        }, { onConflict: 'id' });

        if (record.application) {
          const a = record.application;
          await supabase.from('mawqif_applications').upsert({
            id: a.id,
            user_id: u.id,
            submission_date: a.submissionDate,
            status: a.status,
            vehicle_make: a.vehicleMake,
            vehicle_model: a.vehicleModel,
            vehicle_year: a.vehicleYear,
            vehicle_color: a.vehicleColor,
            plate_number: a.plateNumber,
            vehicle_license_number: a.vehicleLicenseNumber,
            is_owner: a.isOwner,
            owner_relation: a.ownerRelation,
            rejection_reason: a.rejectionReason,
            subscription_number: a.subscriptionNumber,
            subscription_start: a.subscriptionStartDate,
            subscription_end: a.subscriptionEndDate,
            doc_id_document: a.documents?.idDocument || null,
            doc_driving_license: a.documents?.drivingLicense || null,
            doc_vehicle_license: a.documents?.vehicleLicense || null,
            doc_car_photo: a.documents?.carPhoto || null,
            updated_at: new Date().toISOString(),
          }, { onConflict: 'id' });
        }
      }

      return NextResponse.json({ success: true });
    }

    // ---- UPDATE APPLICATION STATUS ----
    if (action === 'update_status') {
      const { appId, newStatus, extraFields, notification } = body;

      const updateData: any = {
        status: newStatus,
        updated_at: new Date().toISOString(),
      };

      if (extraFields?.rejectionReason)      updateData.rejection_reason    = extraFields.rejectionReason;
      if (extraFields?.subscriptionNumber)   updateData.subscription_number = extraFields.subscriptionNumber;
      if (extraFields?.subscriptionStartDate) updateData.subscription_start = extraFields.subscriptionStartDate;
      if (extraFields?.subscriptionEndDate)   updateData.subscription_end   = extraFields.subscriptionEndDate;

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
