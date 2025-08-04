// app/api/events/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';


const supabaseUrl = 'https://aazjsdrvpiofshwyqjrq.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey)

// Fetch all events
export async function GET() {
  const { data, error } = await supabase
    .from('Event')
    .select('*'); // No .order()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}


// Create new event
export async function POST(req: Request) {
  const body = await req.json();
  const { title, details, contact } = body;

  const { data, error } = await supabase
    .from('Event')
    .insert([{ title, details, contact }])
    .select();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const result = data as any[];

  if (!result.length) {
    return NextResponse.json({ error: 'No data returned' }, { status: 500 });
  }

  return NextResponse.json(result[0]);
}



