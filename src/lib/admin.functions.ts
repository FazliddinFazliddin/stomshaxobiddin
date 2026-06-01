import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SettingsInput = z.object({
  telegram_bot_token: z.string().trim().max(200).optional().nullable().default(""),
  telegram_chat_id: z.string().trim().max(60).optional().nullable().default(""),
});

export const getAdminSettings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin");
    if (!roles || roles.length === 0) throw new Error("Forbidden: admin only");

    const { data, error } = await supabase
      .from("admin_settings")
      .select("telegram_bot_token, telegram_chat_id, updated_at")
      .eq("id", 1)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ?? { telegram_bot_token: "", telegram_chat_id: "", updated_at: null };
  });

export const updateAdminSettings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => SettingsInput.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    const { data: roles } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin");
    if (!roles || roles.length === 0) throw new Error("Forbidden: admin only");

    const { error } = await supabase
      .from("admin_settings")
      .update({
        telegram_bot_token: data.telegram_bot_token || null,
        telegram_chat_id: data.telegram_chat_id || null,
        updated_at: new Date().toISOString(),
        updated_by: userId,
      })
      .eq("id", 1);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
