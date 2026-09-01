import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Server-side persistent storage file path
const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'mawqif_db.json');

// Helper to ensure data file exists
function getDB(): Record<string, any> {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify({}), 'utf-8');
      return {};
    }
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return content ? JSON.parse(content) : {};
  } catch (error) {
    console.error('Error reading mawqif_db.json:', error);
    return {};
  }
}

function saveDB(data: Record<string, any>) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing mawqif_db.json:', error);
  }
}

// GET: Fetch all user records & applications
export async function GET() {
  const db = getDB();
  return NextResponse.json({ success: true, data: db });
}

// POST: Save or update accounts database
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId, record, allAccounts, appId, newStatus, extraFields, notification } = body;

    const db = getDB();

    if (action === 'sync_all' && allAccounts) {
      // Merge all accounts
      const merged = { ...db, ...allAccounts };
      saveDB(merged);
      return NextResponse.json({ success: true, data: merged });
    }

    if (action === 'save_user' && userId && record) {
      db[userId] = record;
      saveDB(db);
      return NextResponse.json({ success: true, data: db });
    }

    if (action === 'update_status' && appId && newStatus) {
      let found = false;
      for (const uId in db) {
        const acc = db[uId];
        if (acc?.application && (acc.application.id === appId || acc.application.subscriptionNumber === appId)) {
          acc.application.status = newStatus;
          if (extraFields) {
            Object.assign(acc.application, extraFields);
          }
          if (notification) {
            acc.notifications = [notification, ...(acc.notifications || [])];
          }
          found = true;
          break;
        }
      }
      if (found) {
        saveDB(db);
      }
      return NextResponse.json({ success: true, data: db });
    }

    return NextResponse.json({ success: true, data: db });
  } catch (error: any) {
    console.error('API Error in /api/mawqif/db:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
