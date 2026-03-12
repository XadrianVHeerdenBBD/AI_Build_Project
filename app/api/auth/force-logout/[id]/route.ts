// /app/api/auth/force-logout/[id]/route.ts
import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase/server';
import { getUser } from '@/lib/auth/get-user';

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  const caller = await getUser();
  if (!caller) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const targetId = (await context.params).id;

  // Only educators or the user themselves can trigger a force-logout
  const isEducator = caller.profile.role === 'educator';
  const isSelf = caller.profile.id === targetId;
  if (!isEducator && !isSelf) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.admin.signOut(targetId);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ success: true });
}
