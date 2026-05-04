import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, MapPin, Clock, Star, ShieldCheck, Sparkles, HeartHandshake, Award, ArrowRight } from "lucide-react";
import heroDentist from "@/assets/hero-dentist.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stomatolog Shaxobiddin — Toshkentdagi premium stomatologiya" },
      {
        name: "description",
        content:
          "Shaxobiddin shifokor — Toshkentdagi zamonaviy stomatologiya klinikasi. 24/7 ochiq, 4.9★ reyting. Bepul konsultatsiya uchun yoziling.",
      },
      { property: "og:title", content: "Stomatolog Shaxobiddin — Premium stomatologiya" },
      { property: "og:description", content: "Sog‘lom va chiroyli tabassum uchun ishonchli manzil. Toshkent, Yangizamon ko‘chasi 11." },
      { property: "og:image", content: heroDentist },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const PHONE = "+998 93 507 57 95";
const ADDRESS = "Quruvchi dahasi, 1, Toshkent";

function Index() {
  return (
    <main className="min-h-screen bg-background text-foreground antialiased">
      <Toaster position="top-center" richColors />
      <Nav />
      <Hero />
      <Services />
      <WhyUs />
      <Gallery />
      <Faq />
      <FinalCta />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="h-9 w-9 rounded-full bg-gradient-emerald flex items-center justify-center text-primary-foreground font-display text-lg">S</span>
          <span className="font-display text-xl tracking-tight">Shaxobiddin</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#xizmatlar" className="hover:text-foreground transition-colors">Xizmatlar</a>
          <a href="#nega-biz" className="hover:text-foreground transition-colors">Nega biz</a>
          <a href="#galereya" className="hover:text-foreground transition-colors">Galereya</a>
          <a href="#savollar" className="hover:text-foreground transition-colors">Savollar</a>
        </nav>
        <a
          href={`tel:${PHONE.replace(/\s/g, "")}`}
          className="hidden md:inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-foreground/15 hover:bg-foreground hover:text-background transition-all"
        >
          <Phone className="h-3.5 w-3.5" /> Qo‘ng‘iroq
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-28 lg:pt-32 pb-20 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-warm pointer-events-none" />
      <div className="absolute -top-20 -right-32 h-[500px] w-[500px] rounded-full bg-accent/20 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 text-xs font-medium text-foreground/70 mb-8">
            <span className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-3 w-3 fill-accent text-accent" />
              ))}
            </span>
            4.9 — 30+ haqiqiy fikr · Toshkent
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-balance">
            Tabassumingiz —{" "}
            <em className="italic text-primary">eng kuchli</em>{" "}
            taqdimnomangiz.
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-xl text-pretty">
            Stomatolog Shaxobiddin klinikasida zamonaviy uskunalar, og‘riqsiz davolash va
            haqiqiy g‘amxo‘rlik. 24 soat ochiqmiz — sizga qulay vaqtda yozilishingiz mumkin.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-foreground/70">
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> 24 soat ochiq</span>
            <span className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> {ADDRESS}</span>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> Steril & xavfsiz</span>
          </div>
        </div>

        <div className="lg:col-span-5 animate-fade-up">
          <ContactForm />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 mt-20">
        <div className="relative rounded-3xl overflow-hidden shadow-elegant aspect-[16/9] lg:aspect-[21/9]">
          <img
            src={heroDentist}
            alt="Stomatolog Shaxobiddin klinikasida"
            width={1280}
            height={720}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/40 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-primary-foreground">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] opacity-80">Bosh shifokor</p>
              <p className="font-display text-2xl mt-1">Dr. Shaxobiddin</p>
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-xs uppercase tracking-[0.2em] opacity-80">Tajriba</p>
              <p className="font-display text-2xl mt-1">3+ yil</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", service: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Iltimos, ism va telefon raqamingizni kiriting");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Rahmat! Tez orada siz bilan bog‘lanamiz.");
      setForm({ name: "", phone: "", service: "" });
    }, 900);
  };

  return (
    <div className="relative rounded-3xl bg-card p-7 lg:p-8 shadow-elegant border border-border/60">
      <div className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium tracking-wide">
        Bepul konsultatsiya
      </div>
      <h3 className="font-display text-2xl mt-2">Yozilish — 30 soniyada</h3>
      <p className="text-sm text-muted-foreground mt-1">Sizga 15 daqiqa ichida qo‘ng‘iroq qilamiz.</p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <Field label="Ismingiz">
          <input
            type="text"
            required
            maxLength={60}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Ismingiz"
            className="w-full bg-transparent border-0 border-b border-border focus:border-primary outline-none py-2 text-base placeholder:text-muted-foreground/60 transition-colors"
          />
        </Field>
        <Field label="Telefon raqam">
          <input
            type="tel"
            required
            maxLength={20}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            placeholder="+998 __ ___ __ __"
            className="w-full bg-transparent border-0 border-b border-border focus:border-primary outline-none py-2 text-base placeholder:text-muted-foreground/60 transition-colors"
          />
        </Field>
        <Field label="Xizmat (ixtiyoriy)">
          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full bg-transparent border-0 border-b border-border focus:border-primary outline-none py-2 text-base transition-colors"
          >
            <option value="">Tanlang…</option>
            <option>Tish davolash</option>
            <option>Tish oqartirish</option>
            <option>Implantatsiya</option>
            <option>Bolalar stomatologiyasi</option>
            <option>Konsultatsiya</option>
          </select>
        </Field>

        <button
          type="submit"
          disabled={loading}
          className="group mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-4 text-base font-medium hover:bg-primary/90 transition-all disabled:opacity-60"
        >
          {loading ? "Yuborilmoqda…" : "Qo‘ng‘iroqqa yozilish"}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-xs text-muted-foreground text-center">
          Ma‘lumotlaringiz maxfiy saqlanadi.
        </p>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1">{label}</span>
      {children}
    </label>
  );
}

const services = [
  { title: "Tish davolash", desc: "Og‘riqsiz davolash, zamonaviy plombalar va kanal terapiyasi.", price: "150 000 so‘mdan" },
  { title: "Tish oqartirish", desc: "Bir seansda 4–6 ton oqaroq, emalga zarar yetkazmasdan.", price: "650 000 so‘mdan" },
  { title: "Implantatsiya", desc: "Premium yevropa implantlari, 10 yillik kafolat bilan.", price: "4 500 000 so‘mdan" },
  { title: "Estetik restavratsiya", desc: "Vinirlar va keramik qoplamalar — tabiiy ko‘rinish.", price: "1 200 000 so‘mdan" },
  { title: "Bolalar stomatologiyasi", desc: "Yumshoq yondashuv, qo‘rquvsiz birinchi tashrif.", price: "100 000 so‘mdan" },
  { title: "Professional gigiyena", desc: "Ultratovushli tozalash va Air Flow muolajasi.", price: "350 000 so‘mdan" },
];

function Services() {
  return (
    <section id="xizmatlar" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead
          eyebrow="Xizmatlar"
          title="Har bir tabassum uchun — alohida yondashuv."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="group relative bg-card p-8 lg:p-10 hover:bg-secondary transition-colors duration-500"
            >
              <div className="text-xs font-medium text-muted-foreground tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-2xl mt-6">{s.title}</h3>
              <p className="text-muted-foreground mt-3 text-sm leading-relaxed">{s.desc}</p>
              <div className="mt-8 flex items-center justify-between">
                <span className="text-sm font-medium text-primary">{s.price}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const reasons = [
  { icon: Award, title: "10 yillik tajriba", desc: "Mingdan ortiq baxtli mijozlar va doimiy malaka oshirish." },
  { icon: ShieldCheck, title: "Steril xavfsizlik", desc: "Yevropa standartlari bo‘yicha har bir asbob alohida sterilizatsiyadan o‘tadi." },
  { icon: Sparkles, title: "Zamonaviy uskunalar", desc: "Raqamli rentgen, lazer va og‘riqsiz anesteziya texnikalari." },
  { icon: HeartHandshake, title: "Halol narxlar", desc: "Hech qachon yashirin to‘lov yo‘q — barchasi davolashdan oldin kelishiladi." },
];

function WhyUs() {
  return (
    <section id="nega-biz" className="py-24 lg:py-32 bg-gradient-emerald text-primary-foreground relative overflow-hidden">
      <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-accent/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.25em] text-accent mb-6">Nega biz</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance">
            Ishonch — bizning eng <em className="italic">qimmatli</em> asbobimiz.
          </h2>
          <p className="mt-6 text-primary-foreground/75 max-w-md text-pretty">
            Biz shoshmaymiz. Har bir bemor uchun vaqt ajratamiz, davolash rejasini
            tushunarli qilib tushuntiramiz va siz tayyor bo‘lganingizdan keyingina
            ish boshlaymiz.
          </p>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            <Stat n="4.9★" l="Reyting" />
            <Stat n="2 000+" l="Bemor" />
            <Stat n="24/7" l="Ochiq" />
          </div>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-primary-foreground/10 rounded-3xl overflow-hidden">
          {reasons.map((r) => (
            <div key={r.title} className="bg-primary p-8 lg:p-10">
              <r.icon className="h-7 w-7 text-accent" strokeWidth={1.4} />
              <h3 className="font-display text-xl mt-6">{r.title}</h3>
              <p className="mt-2 text-sm text-primary-foreground/70 leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-accent">{n}</div>
      <div className="text-xs uppercase tracking-wider text-primary-foreground/60 mt-1">{l}</div>
    </div>
  );
}

const galleryImages = [
  { src: g1, alt: "Klinika xonasi", span: "lg:col-span-2 lg:row-span-2" },
  { src: g3, alt: "Mijoz tabassumi", span: "" },
  { src: g2, alt: "Stomatologiya asboblari", span: "" },
  { src: g5, alt: "Qabulxona", span: "lg:col-span-2" },
  { src: g4, alt: "Shifokor ish jarayonida", span: "" },
  { src: g6, alt: "Stomatologiya kreslosi", span: "" },
];

function Gallery() {
  return (
    <section id="galereya" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead eyebrow="Galereya" title="Klinika ichidan bir lahzalar." />

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 auto-rows-[180px] sm:auto-rows-[240px] lg:auto-rows-[260px] gap-3 lg:gap-4">
          {galleryImages.map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-2xl group ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "Klinika qachon ochiq?", a: "Biz 24 soat, haftada 7 kun ochiqmiz. Shoshilinch holatlarda ham yordam beramiz." },
  { q: "Qabulga qanday yozilaman?", a: "Yuqoridagi forma orqali yoki to‘g‘ridan-to‘g‘ri qo‘ng‘iroq qiling — 15 daqiqa ichida tasdiqlaymiz." },
  { q: "Davolash og‘riqlimi?", a: "Yo‘q. Biz zamonaviy anesteziya va yumshoq texnikalardan foydalanamiz, bemor qulaylik his qiladi." },
  { q: "Bolalarni qabul qilasizlarmi?", a: "Albatta. Bizda bolalar uchun alohida yondashuv va o‘yin orqali tanishtirish bor." },
  { q: "To‘lovni qismlab amalga oshirsa bo‘ladimi?", a: "Ha, yirik muolajalar uchun foizsiz bo‘lib to‘lash imkoniyati mavjud." },
  { q: "Kafolat berasizlarmi?", a: "Ha. Plombalar 2 yil, implantlar esa 10 yilgacha kafolatga ega." },
];

function Faq() {
  return (
    <section id="savollar" className="py-24 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <SectionHead eyebrow="Savol-javob" title="Eng ko‘p so‘raladigan savollar." />

        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border bg-card rounded-2xl px-6 data-[state=open]:shadow-soft transition-all"
            >
              <AccordionTrigger className="font-display text-lg hover:no-underline py-5 text-left">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5 text-base">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function FinalCta() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-emerald text-primary-foreground p-10 sm:p-16 lg:p-20 text-center shadow-elegant">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />

          <p className="relative text-xs uppercase tracking-[0.25em] text-accent">Bugun boshlang</p>
          <h2 className="relative font-display text-4xl sm:text-5xl lg:text-6xl mt-5 leading-[1.05] text-balance">
            Sog‘lom tabassum — bir <em className="italic">qo‘ng‘iroq</em> uzoqlikda.
          </h2>
          <p className="relative mt-5 text-primary-foreground/80 max-w-xl mx-auto text-pretty">
            Bepul konsultatsiyaga yozilish uchun hoziroq qo‘ng‘iroq qiling yoki forma to‘ldiring.
          </p>

          <div className="relative mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-7 py-4 text-base font-medium hover:opacity-90 transition-all"
            >
              <Phone className="h-4 w-4" /> {PHONE}
            </a>
            <a
              href="#top"
              className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/30 px-7 py-4 text-base font-medium hover:bg-primary-foreground/10 transition-all"
            >
              Onlayn yozilish <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 flex flex-col sm:flex-row gap-6 items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-7 w-7 rounded-full bg-gradient-emerald flex items-center justify-center text-primary-foreground font-display text-sm">S</span>
          <span className="font-display text-base text-foreground">Stomatolog Shaxobiddin</span>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 justify-center">
          <span className="inline-flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {ADDRESS}</span>
          <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> 24 soat</span>
        </div>
        <p>© {new Date().getFullYear()} Shaxobiddin Klinikasi</p>
      </div>
    </footer>
  );
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs uppercase tracking-[0.25em] text-primary mb-5">{eyebrow}</p>
      <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance">{title}</h2>
    </div>
  );
}
