import { NextResponse } from "next/server";
import { createServerSupabase } from "@/lib/supabase/server";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const supabase = await createServerSupabase();

  const { id } = await context.params;
  const patternId = id;

  // Get user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  // Lookup student's pattern profile
  const { data: profile, error } = await supabase
    .from("student_pattern_learning_profile")
    .select("id, has_completed_reflection")
    .eq("student_id", user.id)
    .eq("pattern_id", patternId)
    .single();

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  if (error) {
    return NextResponse.json({ error: "Failed to load profile" }, { status: 500 });
  }

  return NextResponse.json({ profile });
}
