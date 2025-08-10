import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    hasService: !!process.env.SUPABASE_KEY,
    hasAnon: !!(process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
  });
}
