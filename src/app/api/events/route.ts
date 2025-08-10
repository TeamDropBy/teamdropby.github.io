import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = 'https://aazjsdrvpiofshwyqjrq.supabase.co';

function getAdminClient() {
  const key = process.env.SUPABASE_KEY;
  if (!key) {
    // Don’t throw at import-time; return a clear runtime error.
    throw new Error('SUPABASE_KEY is missing. Set it in Vercel → Project → Settings → Environment Variables.');
  }
  return createClient(supabaseUrl, key);
}

// Fetch all events
export async function GET() {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase
      .from('Event')
      .select('*')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Supabase fetch error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(data);
  } catch (e: any) {
    console.error('GET /api/events init error:', e?.message);
    return NextResponse.json({ error: e?.message || 'Server misconfiguration' }, { status: 500 });
  }
}

// Create new event
export async function POST(req: Request) {
  try {
    const supabase = getAdminClient();
    const body = await req.json();
    const { title, details, contact } = body;

    const { data, error } = await supabase
      .from('Event')
      .insert([{ title, details, contact }])
      .select();

    if (error) {
      console.error('Supabase insert error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json((data as any[])[0]);
  } catch (e: any) {
    console.error('POST /api/events init error:', e?.message);
    return NextResponse.json({ error: e?.message || 'Server misconfiguration' }, { status: 500 });
  }
}





