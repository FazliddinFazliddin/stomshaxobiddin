CREATE TABLE public.telegram_recipients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text NOT NULL UNIQUE,
  chat_id bigint NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.telegram_recipients ENABLE ROW LEVEL SECURITY;

-- No public policies - only service role (server) can read/write
CREATE TABLE public.bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  service text,
  notified boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Anyone (including anonymous) can submit a booking
CREATE POLICY "Anyone can create bookings"
  ON public.bookings FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
