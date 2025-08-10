import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabaseUrl = 'https://aazjsdrvpiofshwyqjrq.supabase.co';

function getAdminClient() {
  const key = process.env.SUPABASE_KEY;
  if (!key) {
    throw new Error('SUPABASE_KEY is missing.');
  }
  return createClient(supabaseUrl, key);
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    const supabase = getAdminClient();
    
    // First, let's see all RSVPs in the table
    const { data: allRSVPs, error: allError } = await supabase
      .from('RSVP')
      .select('*');

    // Then, let's try the specific user query
    const { data: userRSVPs, error: userError } = await supabase
      .from('RSVP')
      .select('*')
      .eq('user_id', userId);

    // Let's also try the join query
    const { data: joinData, error: joinError } = await supabase
      .from('RSVP')
      .select(`
        id,
        event_id,
        user_id,
        Event (
          id,
          title,
          details,
          contact,
          createdAt
        )
      `)
      .eq('user_id', userId);

    // Check if the user exists in auth.users
    const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();

    return NextResponse.json({
      userId: userId,
      allRSVPs: allRSVPs || [],
      allRSVPsError: allError?.message || null,
      userRSVPs: userRSVPs || [],
      userRSVPsError: userError?.message || null,
      joinData: joinData || [],
      joinError: joinError?.message || null,
      authUsers: authUsers.users.map(u => ({ id: u.id, email: u.email })),
      authError: authError?.message || null
    });

  } catch (e: any) {
    return NextResponse.json({ 
      error: e?.message || 'Server error',
      stack: e?.stack 
    }, { status: 500 });
  }
}
