// app/api/events/route.ts
import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';


const supabaseUrl = 'https://aazjsdrvpiofshwyqjrq.supabase.co'
const supabaseKey = process.env.SUPABASE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey)

// Fetch all events
export async function GET() {
  const { data, error } = await supabase
    .from('Event') // ✅ Case-sensitive! Make sure this is 'Event' if Supabase says so
    .select('*')
    .order('createdAt', { ascending: false });

  if (error) {
    console.error('Supabase fetch error:', error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  console.log('GET /api/events triggered');
  console.log('Fetched events:', data);
  return NextResponse.json(data);
  

}




// Create new event
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('Received body:', body);

    const { title, details, contact } = body;

    const { data, error } = await supabase
      .from('Event')
      .insert([{ title, details, contact }])
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




