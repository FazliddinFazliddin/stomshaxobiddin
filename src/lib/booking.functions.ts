import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const DOCTOR_USERNAME = "nuriddinovvicc";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/telegram";

const BookingInput = z.object({
  name: z.string().trim().min(1).max(80),
  phone: z.string().trim().min(3).max(30),
  service: z.string().trim().max(100).optional().default(""),
});

async function tg(method: string, body: Record<string, unknown>) {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  const TELEGRAM_API_KEY = process.env.TELEGRAM_API_KEY;
  if (!LOVABLE_API_KEY || !TELEGRAM_API_KEY) {
    throw new Error("Telegram credentials not configured");
  }
  const res = await fetch(`${GATEWAY_URL}/${method}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": TELEGRAM_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok || !data.ok) {
    throw new Error(`Telegram ${method} failed: ${JSON.stringify(data)}`);
  }
  return data;
}

async function findChatIdFromUpdates(username: string): Promise<number | null> {
  const data = await tg("getUpdates", {});
  const target = username.toLowerCase();
  const updates: any[] = data.result ?? [];
  for (let i = updates.length - 1; i >= 0; i--) {
    const m = updates[i].message ?? updates[i].edited_message;
    const u = m?.from?.username;
    if (u && u.toLowerCase() === target && m?.chat?.id) {
      return m.chat.id as number;
    }
  }
  return null;
}

async function getDoctorChatId(): Promise<number | null> {
  const { data } = await supabaseAdmin
    .from("telegram_recipients")
    .select("chat_id")
    .eq("username", DOCTOR_USERNAME)
    .maybeSingle();
  if (data?.chat_id) return Number(data.chat_id);

  const found = await findChatIdFromUpdates(DOCTOR_USERNAME);
  if (found) {
    await supabaseAdmin
      .from("telegram_recipients")
      .upsert({ username: DOCTOR_USERNAME, chat_id: found }, { onConflict: "username" });
    return found;
  }
  return null;
}

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => BookingInput.parse(input))
  .handler(async ({ data }) => {
    try {
      const { data: booking, error } = await supabaseAdmin
        .from("bookings")
        .insert({ name: data.name, phone: data.phone, service: data.service || null })
        .select()
        .single();
      if (error) {
        console.error("[booking] insert failed:", error);
        throw new Error(`DB insert failed: ${error.message}`);
      }

      let chatId: number | null = null;
      try {
        chatId = await getDoctorChatId();
      } catch (e) {
        console.error("[booking] getDoctorChatId failed:", e);
      }
    if (!chatId) {
      return {
        ok: true,
        notified: false,
        message:
          "Saqlandi, lekin shifokor hali botni ishga tushirmagan. @stom_shaxobiddin_bot ga /start yuborilsin.",
      };
    }

    const text =
      `🦷 <b>Yangi yozuv</b>\n\n` +
      `<b>Ism:</b> ${escapeHtml(data.name)}\n` +
      `<b>Telefon:</b> <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a>\n` +
      `<b>Xizmat:</b> ${escapeHtml(data.service || "—")}\n` +
      `<b>Vaqt:</b> ${new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}`;

    try {
      await tg("sendMessage", {
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      });
      await supabaseAdmin.from("bookings").update({ notified: true }).eq("id", booking.id);
      return { ok: true, notified: true };
    } catch (e) {
      console.error("Telegram send failed:", e);
      return { ok: true, notified: false };
    }
  });

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
