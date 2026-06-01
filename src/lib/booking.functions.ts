import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const DOCTOR_USERNAME = "nuriddinovvicc";
const GATEWAY_URL = "https://connector-gateway.lovable.dev/telegram";

const BookingInput = z.object({
  name: z.string().trim().min(1).max(80),
  phone: z.string().trim().min(3).max(30),
  email: z.string().trim().max(120).optional().nullable().default(""),
  service: z.string().trim().max(100).optional().nullable().default(""),
  preferredAt: z.string().trim().max(120).optional().nullable().default(""),
  notes: z.string().trim().max(1000).optional().nullable().default(""),
  // honeypot — bots fill this, humans don't see it. Accept any string; check non-empty in handler.
  website: z.string().max(200).optional().nullable().default(""),
});

type TelegramConfig =
  | { mode: "direct"; token: string; chatId: string }
  | { mode: "gateway" };

async function getTelegramConfig(): Promise<TelegramConfig | null> {
  const { data } = await supabaseAdmin
    .from("admin_settings")
    .select("telegram_bot_token, telegram_chat_id")
    .eq("id", 1)
    .maybeSingle();
  if (data?.telegram_bot_token && data?.telegram_chat_id) {
    return { mode: "direct", token: data.telegram_bot_token, chatId: data.telegram_chat_id };
  }
  if (process.env.LOVABLE_API_KEY && process.env.TELEGRAM_API_KEY) {
    return { mode: "gateway" };
  }
  return null;
}

async function sendTelegram(cfg: TelegramConfig, text: string): Promise<boolean> {
  if (cfg.mode === "direct") {
    const res = await fetch(`https://api.telegram.org/bot${cfg.token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: cfg.chatId,
        text,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      console.error("[booking] direct telegram send failed:", data);
      return false;
    }
    return true;
  }

  // gateway fallback
  const chatId = await getDoctorChatIdViaGateway().catch((e) => {
    console.error("[booking] gateway chat id lookup failed:", e);
    return null;
  });
  if (!chatId) return false;
  const res = await fetch(`${GATEWAY_URL}/sendMessage`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": process.env.TELEGRAM_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.ok) {
    console.error("[booking] gateway telegram send failed:", data);
    return false;
  }
  return true;
}

async function getDoctorChatIdViaGateway(): Promise<number | null> {
  const { data } = await supabaseAdmin
    .from("telegram_recipients")
    .select("chat_id")
    .eq("username", DOCTOR_USERNAME)
    .maybeSingle();
  if (data?.chat_id) return Number(data.chat_id);

  const res = await fetch(`${GATEWAY_URL}/getUpdates`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": process.env.TELEGRAM_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok || !payload.ok) return null;
  const updates: any[] = payload.result ?? [];
  const target = DOCTOR_USERNAME.toLowerCase();
  for (let i = updates.length - 1; i >= 0; i--) {
    const m = updates[i].message ?? updates[i].edited_message;
    if (m?.from?.username?.toLowerCase() === target && m?.chat?.id) {
      await supabaseAdmin
        .from("telegram_recipients")
        .upsert({ username: DOCTOR_USERNAME, chat_id: m.chat.id }, { onConflict: "username" });
      return m.chat.id as number;
    }
  }
  return null;
}

function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function runHandler(data: z.infer<typeof BookingInput>) {
  // Honeypot triggered — silently accept and drop
  if (data.website) {
    console.warn("[booking] honeypot triggered, dropping submission");
    return { ok: true, notified: false };
  }

  const { data: booking, error } = await supabaseAdmin
    .from("bookings")
    .insert({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      service: data.service || null,
      preferred_at: data.preferredAt || null,
      notes: data.notes || null,
    })
    .select()
    .single();
  if (error) {
    console.error("[booking] insert failed:", error);
    throw new Error(`DB insert failed: ${error.message}`);
  }

  const chatId = await getDoctorChatId().catch((e) => {
    console.error("[booking] getDoctorChatId failed:", e);
    return null;
  });

  if (!chatId) {
    return {
      ok: true,
      notified: false,
      message:
        "Saqlandi, lekin shifokor hali botni ishga tushirmagan.",
    };
  }

  const lines = [
    `🦷 <b>Yangi yozuv</b>`,
    ``,
    `<b>Ism:</b> ${escapeHtml(data.name)}`,
    `<b>Telefon:</b> <a href="tel:${escapeHtml(data.phone)}">${escapeHtml(data.phone)}</a>`,
  ];
  if (data.email) lines.push(`<b>Email:</b> ${escapeHtml(data.email)}`);
  if (data.service) lines.push(`<b>Xizmat:</b> ${escapeHtml(data.service)}`);
  if (data.preferredAt) lines.push(`<b>Vaqt (so'rov):</b> ${escapeHtml(data.preferredAt)}`);
  if (data.notes) lines.push(`<b>Izoh:</b> ${escapeHtml(data.notes)}`);
  lines.push(`<b>Yuborildi:</b> ${new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })}`);
  const text = lines.join("\n");

  const sent = await tg("sendMessage", {
    chat_id: chatId,
    text,
    parse_mode: "HTML",
    disable_web_page_preview: true,
  }).then(() => true).catch((e) => {
    console.error("[booking] Telegram send failed:", e);
    return false;
  });

  if (sent) {
    await supabaseAdmin.from("bookings").update({ notified: true }).eq("id", booking.id);
  }
  return { ok: true, notified: sent };
}

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => BookingInput.parse(input))
  .handler(async ({ data }) => {
    return await runHandler(data).catch((e) => {
      console.error("[booking] handler failed:", e);
      throw e;
    });
  });
