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

// Get user's RSVPs
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const supabase = getAdminClient();
    
    // First get the RSVPs
    const { data: rsvps, error: rsvpError } = await supabase
      .from('RSVP')
      .select('id, event_id, user_id')
      .eq('user_id', userId);

    if (rsvpError) {
      console.error('Error fetching RSVPs:', rsvpError);
      return NextResponse.json({ error: rsvpError.message }, { status: 500 });
    }

    if (!rsvps || rsvps.length === 0) {
      return NextResponse.json([]);
    }

    // Then get the events for those RSVPs
    const eventIds = rsvps.map(rsvp => rsvp.event_id);
    const { data: events, error: eventError } = await supabase
      .from('Event')
      .select('*')
      .in('id', eventIds);

    if (eventError) {
      console.error('Error fetching events:', eventError);
      return NextResponse.json({ error: eventError.message }, { status: 500 });
    }

    // Combine the data
    const result = rsvps.map(rsvp => {
      const event = events?.find(e => e.id === rsvp.event_id);
      return {
        id: rsvp.id,
        event_id: rsvp.event_id,
        Event: event
      };
    }).filter(item => item.Event); // Only include items where we found the event

    return NextResponse.json(result);
  } catch (e: any) {
    console.error('GET /api/rsvp error:', e?.message);
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}

// Create new RSVP
export async function POST(req: Request) {
  try {
    const { userId, eventId } = await req.json();

    if (!userId || !eventId) {
      return NextResponse.json(
        { error: 'User ID and Event ID are required' }, 
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    // Check if RSVP already exists
    const { data: existing } = await supabase
      .from('RSVP')
      .select('id')
      .eq('user_id', userId)
      .eq('event_id', eventId)
      .single();

    if (existing) {
      return NextResponse.json(
        { error: 'Already RSVP\'d to this event' }, 
        { status: 400 }
      );
    }

    // Create new RSVP
    const { data, error } = await supabase
      .from('RSVP')
      .insert([{ user_id: userId, event_id: eventId }])
      .select()
      .single();

    if (error) {
      console.error('Error creating RSVP:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (e: any) {
    console.error('POST /api/rsvp error:', e?.message);
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}

// Delete RSVP
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const eventId = searchParams.get('eventId');

    if (!userId || !eventId) {
      return NextResponse.json(
        { error: 'User ID and Event ID are required' }, 
        { status: 400 }
      );
    }

    const supabase = getAdminClient();

    const { error } = await supabase
      .from('RSVP')
      .delete()
      .eq('user_id', userId)
      .eq('event_id', eventId);

    if (error) {
      console.error('Error deleting RSVP:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error('DELETE /api/rsvp error:', e?.message);
    return NextResponse.json({ error: e?.message || 'Server error' }, { status: 500 });
  }
}
