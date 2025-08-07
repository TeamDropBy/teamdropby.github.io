// app/api/events/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Supabase setup
const supabaseUrl = 'https://aazjsdrvpiofshwyqjrq.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

// GET: Fetch all events
export async function GET() {
  const { data, error } = await supabase
    .from('Event')
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) {
    console.error('Supabase fetch error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

// ✅ POST: Create new event (requires user_id from localStorage)
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, details, contact, user_id } = body;

    if (!title || !details || !contact || !user_id) {
      return NextResponse.json(
        { error: 'Missing title, details, contact, or user_id' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('Event')
      .insert([{ title, details, contact, user_id }])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const result = data as any[];

    if (!result.length) {
      return NextResponse.json({ error: 'No data returned' }, { status: 500 });
    }

    return NextResponse.json(result[0]);
  } catch (err: any) {
    console.error('POST route crash:', err.message);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

// ✅ DELETE: Delete event by ID
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Missing event ID' }, { status: 400 });
  }

  const { error } = await supabase
    .from('Event')
    .delete()
    .eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}





