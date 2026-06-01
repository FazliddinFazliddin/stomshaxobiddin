import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getAdminSettings, updateAdminSettings } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Settings" }] }),
  component: AdminPage,
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-xl font-bold text-foreground">Couldn't load settings</h1>
          <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="mt-4 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground"
          >Retry</button>
        </div>
      </div>
    );
  },
});

function AdminPage() {
  const navigate = useNavigate();
  const fetchSettings = useServerFn(getAdminSettings);
  const saveSettings = useServerFn(updateAdminSettings);

  const [checking, setChecking] = useState(true);
  const [token, setToken] = useState("");
  const [chatId, setChatId] = useState("");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error || !data.user) {
        navigate({ to: "/login" });
        return;
      }
      try {
        const s = await fetchSettings();
        if (cancelled) return;
        setToken(s.telegram_bot_token ?? "");
        setChatId(s.telegram_chat_id ?? "");
      } catch (e: any) {
        if (!cancelled) setMsg({ type: "err", text: e?.message ?? "Failed to load" });
      } finally {
        if (!cancelled) setChecking(false);
      }
    })();
    return () => { cancelled = true; };
  }, [fetchSettings, navigate]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);
    try {
      await saveSettings({ data: { telegram_bot_token: token, telegram_chat_id: chatId } });
      setMsg({ type: "ok", text: "Settings saved." });
    } catch (err: any) {
      setMsg({ type: "err", text: err?.message ?? "Save failed" });
    } finally {
      setSaving(false);
    }
  };

  const onSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  if (checking) {
    return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading…</div>;
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Settings</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Configure your Telegram bot token and chat ID. Booking notifications will use these values.
            </p>
          </div>
          <button onClick={onSignOut} className="text-sm text-muted-foreground hover:text-foreground">
            Sign out
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-8 space-y-6 rounded-lg border border-border bg-card p-6">
          <div>
            <label className="block text-sm font-medium text-foreground">Telegram Bot Token</label>
            <input
              type="text"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="123456:ABC-DEF…"
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-sm"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Create a bot via @BotFather on Telegram and paste the token here.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground">Telegram Chat ID</label>
            <input
              type="text"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
              placeholder="-100123456789 or 123456789"
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 font-mono text-sm"
            />
            <p className="mt-1 text-xs text-muted-foreground">
              Your personal chat ID (or group ID). Send a message to your bot then visit
              {" "}<code>https://api.telegram.org/bot&lt;TOKEN&gt;/getUpdates</code> to find it.
            </p>
          </div>

          {msg && (
            <div className={msg.type === "ok" ? "text-sm text-green-600" : "text-sm text-destructive"}>
              {msg.text}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save settings"}
          </button>
        </form>
      </div>
    </div>
  );
}
