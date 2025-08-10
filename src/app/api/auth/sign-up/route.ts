import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aazjsdrvpiofshwyqjrq.supabase.co';

function getAnonClient() {
  const anon = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return anon ? createClient(supabaseUrl, anon) : null;
}

export async function POST(req: Request) {
  try {
    const supabase = getAnonClient();
    if (!supabase) {
      return NextResponse.json(
        { error: 'Missing SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY' },
        { status: 500 }
      );
    }

    const { email, password } = await req.json();
    if (!email || !password) return NextResponse.json({ error: 'Missing email or password' }, { status: 400 });

    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    return NextResponse.json({
      user: data.user ? { id: data.user.id, email: data.user.email } : null,
      session: data.session ?? null,
      needsEmailConfirm: !data.session,
      message: data.session ? 'Account created and signed in.' : 'Account created. Check your email to confirm.',
    });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? 'Unexpected error' }, { status: 500 });
  }
}


