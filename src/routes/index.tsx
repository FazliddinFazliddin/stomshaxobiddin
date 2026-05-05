import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useState, type ReactNode } from "react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Phone, MapPin, Clock, ShieldCheck, Sparkles, HeartHandshake, Award, ArrowRight, Languages } from "lucide-react";
import heroDentist from "@/assets/hero-dentist.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stomatolog Shaxobiddin — Toshkentdagi premium stomatologiya" },
      {
        name: "description",
        content:
          "Shaxobiddin shifokor — Toshkentdagi zamonaviy stomatologiya klinikasi. Bepul konsultatsiya uchun yoziling.",
      },
      { property: "og:title", content: "Stomatolog Shaxobiddin — Premium stomatologiya" },
      { property: "og:description", content: "Sog‘lom va chiroyli tabassum uchun ishonchli manzil. Toshkent, Quruvchi dahasi 1." },
      { property: "og:image", content: heroDentist },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const PHONE = "+998 93 507 57 95";
const MAP_URL = "https://www.google.com/maps/dir/?api=1&destination=41.21389,69.26387";

type Lang = "uz" | "ru";

const dict = {
  uz: {
    nav: { services: "Xizmatlar", whyUs: "Nega biz", faq: "Savollar", call: "Qo‘ng‘iroq" },
    address: "Quruvchi dahasi 1, Toshkent",
    hero: {
      badge: "Toshkent · Premium stomatologiya",
      title1: "Tabassumingiz —",
      titleEm: "eng kuchli",
      title2: "taqdimnomangiz.",
      desc: "Stomatolog Shaxobiddin klinikasida zamonaviy uskunalar, og‘riqsiz davolash va haqiqiy g‘amxo‘rlik.",
      hours: "Juft kunlari · 09:00–19:00",
      safe: "Steril & xavfsiz",
      chief: "Bosh shifokor",
      doctor: "Dr. Shaxobiddin",
      experience: "Tajriba",
      experienceVal: "3+ yil",
    },
    form: {
      free: "Bepul konsultatsiya",
      title: "Yozilish — 30 soniyada",
      sub: "Sizga 15 daqiqa ichida qo‘ng‘iroq qilamiz.",
      name: "Ismingiz",
      phone: "Telefon raqam",
      service: "Xizmat (ixtiyoriy)",
      placeholder: "Tanlang…",
      services: ["Tish davolash", "Tish oqartirish", "Implantatsiya", "Bolalar stomatologiyasi", "Konsultatsiya"],
      submit: "Qo‘ng‘iroqqa yozilish",
      sending: "Yuborilmoqda…",
      privacy: "Ma‘lumotlaringiz maxfiy saqlanadi.",
      errMissing: "Iltimos, ism va telefon raqamingizni kiriting",
      ok: "Rahmat! Tez orada siz bilan bog‘lanamiz.",
    },
    services: {
      eyebrow: "Xizmatlar",
      title: "Har bir tabassum uchun — alohida yondashuv.",
      from: "so‘mdan",
      list: [
        { title: "Tish davolash", desc: "Og‘riqsiz davolash, zamonaviy plombalar va kanal terapiyasi.", price: "150 000" },
        { title: "Tish oqartirish", desc: "Bir seansda 4–6 ton oqaroq, emalga zarar yetkazmasdan.", price: "650 000" },
        { title: "Implantatsiya", desc: "Premium yevropa implantlari, 10 yillik kafolat bilan.", price: "4 500 000" },
        { title: "Estetik restavratsiya", desc: "Vinirlar va keramik qoplamalar — tabiiy ko‘rinish.", price: "1 200 000" },
        { title: "Bolalar stomatologiyasi", desc: "Yumshoq yondashuv, qo‘rquvsiz birinchi tashrif.", price: "100 000" },
        { title: "Professional gigiyena", desc: "Ultratovushli tozalash va Air Flow muolajasi.", price: "350 000" },
      ],
    },
    why: {
      eyebrow: "Nega biz",
      title1: "Ishonch — bizning eng",
      titleEm: "qimmatli",
      title2: "asbobimiz.",
      desc: "Biz shoshmaymiz. Har bir bemor uchun vaqt ajratamiz va davolash rejasini tushunarli qilib tushuntiramiz.",
      reasons: [
        { title: "+3 yil tajriba", desc: "Yuzlab baxtli mijozlar va doimiy malaka oshirish." },
        { title: "Steril xavfsizlik", desc: "Yevropa standartlari bo‘yicha har bir asbob alohida sterilizatsiyadan o‘tadi." },
        { title: "Zamonaviy uskunalar", desc: "Raqamli rentgen va og‘riqsiz anesteziya texnikalari." },
        { title: "Halol narxlar", desc: "Hech qachon yashirin to‘lov yo‘q — barchasi davolashdan oldin kelishiladi." },
      ],
      stats: [
        { n: "+3 yil", l: "Tajriba" },
        { n: "500+", l: "Bemor" },
        { n: "Juft", l: "kunlari" },
      ],
    },
    faq: {
      eyebrow: "Savol-javob",
      title: "Eng ko‘p so‘raladigan savollar.",
      items: [
        { q: "Klinika qachon ishlaydi?", a: "Juft kunlari (Dushanba, Chorshanba, Juma): 09:00 – 19:00." },
        { q: "Qabulga qanday yozilaman?", a: "Yuqoridagi forma orqali yoki to‘g‘ridan-to‘g‘ri qo‘ng‘iroq qiling — 15 daqiqa ichida tasdiqlaymiz." },
        { q: "Davolash og‘riqlimi?", a: "Yo‘q. Biz zamonaviy anesteziya va yumshoq texnikalardan foydalanamiz." },
        { q: "Bolalarni qabul qilasizlarmi?", a: "Albatta. Bizda bolalar uchun alohida yondashuv bor." },
        { q: "To‘lovni qismlab amalga oshirsa bo‘ladimi?", a: "Ha, yirik muolajalar uchun foizsiz bo‘lib to‘lash imkoniyati mavjud." },
        { q: "Kafolat berasizlarmi?", a: "Ha. Plombalar 2 yil, implantlar esa 10 yilgacha kafolatga ega." },
      ],
    },
    cta: {
      eyebrow: "Bugun boshlang",
      title1: "Sog‘lom tabassum — bir",
      titleEm: "qo‘ng‘iroq",
      title2: "uzoqlikda.",
      desc: "Bepul konsultatsiyaga yozilish uchun hoziroq qo‘ng‘iroq qiling.",
      online: "Onlayn yozilish",
    },
    hours: {
      title: "Ish vaqti",
      line: "Juft kunlari (Dushanba, Chorshanba, Juma)",
      time: "09:00 – 19:00",
    },
    footer: { rights: "Klinikasi", directions: "Yo‘nalish olish" },
  },
  ru: {
    nav: { services: "Услуги", whyUs: "Почему мы", faq: "Вопросы", call: "Звонок" },
    address: "Куручи даха 1, Ташкент",
    hero: {
      badge: "Ташкент · Премиум стоматология",
      title1: "Ваша улыбка —",
      titleEm: "лучшая",
      title2: "презентация.",
      desc: "В клинике стоматолога Шахобиддина — современное оборудование, безболезненное лечение и настоящая забота.",
      hours: "Чётные дни · 09:00–19:00",
      safe: "Стерильно и безопасно",
      chief: "Главный врач",
      doctor: "Др. Шахобиддин",
      experience: "Опыт",
      experienceVal: "3+ года",
    },
    form: {
      free: "Бесплатная консультация",
      title: "Запись — за 30 секунд",
      sub: "Перезвоним вам в течение 15 минут.",
      name: "Ваше имя",
      phone: "Телефон",
      service: "Услуга (необязательно)",
      placeholder: "Выберите…",
      services: ["Лечение зубов", "Отбеливание", "Имплантация", "Детская стоматология", "Консультация"],
      submit: "Записаться на звонок",
      sending: "Отправка…",
      privacy: "Ваши данные конфиденциальны.",
      errMissing: "Пожалуйста, укажите имя и телефон",
      ok: "Спасибо! Мы скоро свяжемся с вами.",
    },
    services: {
      eyebrow: "Услуги",
      title: "Для каждой улыбки — особый подход.",
      from: "сум",
      list: [
        { title: "Лечение зубов", desc: "Безболезненное лечение, современные пломбы и терапия каналов.", price: "от 150 000" },
        { title: "Отбеливание зубов", desc: "На 4–6 тонов светлее за один сеанс, без вреда для эмали.", price: "от 650 000" },
        { title: "Имплантация", desc: "Премиум европейские импланты с 10-летней гарантией.", price: "от 4 500 000" },
        { title: "Эстетическая реставрация", desc: "Виниры и керамические коронки — естественный вид.", price: "от 1 200 000" },
        { title: "Детская стоматология", desc: "Мягкий подход, первый визит без страха.", price: "от 100 000" },
        { title: "Профессиональная гигиена", desc: "Ультразвуковая чистка и Air Flow.", price: "от 350 000" },
      ],
    },
    why: {
      eyebrow: "Почему мы",
      title1: "Доверие — наш самый",
      titleEm: "ценный",
      title2: "инструмент.",
      desc: "Мы не торопимся. Уделяем время каждому пациенту и понятно объясняем план лечения.",
      reasons: [
        { title: "+3 года опыта", desc: "Сотни довольных пациентов и постоянное повышение квалификации." },
        { title: "Стерильная безопасность", desc: "Каждый инструмент стерилизуется по европейским стандартам." },
        { title: "Современное оборудование", desc: "Цифровой рентген и безболезненная анестезия." },
        { title: "Честные цены", desc: "Никаких скрытых платежей — всё согласовывается до лечения." },
      ],
      stats: [
        { n: "+3 года", l: "Опыт" },
        { n: "500+", l: "Пациентов" },
        { n: "Чёт.", l: "дни" },
      ],
    },
    faq: {
      eyebrow: "Вопрос-ответ",
      title: "Часто задаваемые вопросы.",
      items: [
        { q: "Когда работает клиника?", a: "Чётные дни (Понедельник, Среда, Пятница): 09:00 – 19:00." },
        { q: "Как записаться на приём?", a: "Через форму выше или позвоните напрямую — подтвердим за 15 минут." },
        { q: "Лечение болезненное?", a: "Нет. Используем современную анестезию и мягкие техники." },
        { q: "Принимаете ли детей?", a: "Конечно. У нас особый подход к детям." },
        { q: "Можно ли оплачивать частями?", a: "Да, для крупных процедур доступна беспроцентная рассрочка." },
        { q: "Даёте ли гарантию?", a: "Да. Пломбы — 2 года, импланты — до 10 лет гарантии." },
      ],
    },
    cta: {
      eyebrow: "Начните сегодня",
      title1: "Здоровая улыбка — в одном",
      titleEm: "звонке",
      title2: "от вас.",
      desc: "Позвоните прямо сейчас, чтобы записаться на бесплатную консультацию.",
      online: "Онлайн запись",
    },
    hours: {
      title: "Часы работы",
      line: "Чётные дни (Понедельник, Среда, Пятница)",
      time: "09:00 – 19:00",
    },
    footer: { rights: "Клиника", directions: "Построить маршрут" },
  },
} as const;

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: typeof dict.uz }>({
  lang: "uz",
  setLang: () => {},
  t: dict.uz,
});
const useT = () => useContext(LangCtx);

function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("uz");
  return <LangCtx.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</LangCtx.Provider>;
}

function Index() {
  return (
    <LangProvider>
      <main className="min-h-screen bg-background text-foreground antialiased">
        <Toaster position="top-center" richColors />
        <Nav />
        <Hero />
        <Services />
        <WhyUs />
        <Faq />
        <FinalCta />
        <Footer />
      </main>
    </LangProvider>
  );
}

function LangToggle() {
  const { lang, setLang } = useT();
  return (
    <div className="inline-flex items-center rounded-full border border-foreground/15 p-0.5 text-xs font-medium">
      <button
        onClick={() => setLang("uz")}
        className={`px-3 py-1.5 rounded-full transition-colors ${lang === "uz" ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground"}`}
        aria-label="O'zbekcha"
      >
        UZ
      </button>
      <button
        onClick={() => setLang("ru")}
        className={`px-3 py-1.5 rounded-full transition-colors ${lang === "ru" ? "bg-foreground text-background" : "text-foreground/70 hover:text-foreground"}`}
        aria-label="Русский"
      >
        RU
      </button>
    </div>
  );
}

function Nav() {
  const { t } = useT();
  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2">
          <span className="h-9 w-9 rounded-full bg-gradient-emerald flex items-center justify-center text-primary-foreground font-display text-lg">S</span>
          <span className="font-display text-xl tracking-tight">Shaxobiddin</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#xizmatlar" className="hover:text-foreground transition-colors">{t.nav.services}</a>
          <a href="#nega-biz" className="hover:text-foreground transition-colors">{t.nav.whyUs}</a>
          <a href="#savollar" className="hover:text-foreground transition-colors">{t.nav.faq}</a>
        </nav>
        <div className="flex items-center gap-3">
          <LangToggle />
          <a
            href={`tel:${PHONE.replace(/\s/g, "")}`}
            className="hidden sm:inline-flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full border border-foreground/15 hover:bg-foreground hover:text-background transition-all"
          >
            <Phone className="h-3.5 w-3.5" /> {t.nav.call}
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  const { t } = useT();
  return (
    <section id="top" className="relative pt-28 lg:pt-32 pb-20 lg:pb-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-warm pointer-events-none" />
      <div className="absolute -top-20 -right-32 h-[500px] w-[500px] rounded-full bg-accent/20 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-7 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-foreground/5 text-xs font-medium text-foreground/70 mb-8">
            <Languages className="h-3 w-3" />
            {t.hero.badge}
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.02] text-balance">
            {t.hero.title1}{" "}
            <em className="italic text-primary">{t.hero.titleEm}</em>{" "}
            {t.hero.title2}
          </h1>

          <p className="mt-6 text-lg text-muted-foreground max-w-xl text-pretty">{t.hero.desc}</p>

          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm text-foreground/70">
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> {t.hero.hours}</span>
            <a href={MAP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-foreground transition-colors">
              <MapPin className="h-4 w-4 text-primary" /> {t.address}
            </a>
            <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-primary" /> {t.hero.safe}</span>
          </div>
        </div>

        <div className="lg:col-span-5 animate-fade-up">
          <ContactForm />
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 mt-20">
        <div className="relative rounded-3xl overflow-hidden shadow-elegant aspect-[4/5] sm:aspect-[3/4] lg:aspect-[16/10]">
          <img
            src={heroDentist}
            alt={t.hero.doctor}
            width={1600}
            height={1000}
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-primary-foreground">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] opacity-80">{t.hero.chief}</p>
              <p className="font-display text-2xl mt-1">{t.hero.doctor}</p>
            </div>
            <div className="hidden sm:block text-right">
              <p className="text-xs uppercase tracking-[0.2em] opacity-80">{t.hero.experience}</p>
              <p className="font-display text-2xl mt-1">{t.hero.experienceVal}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactForm() {
  const { t } = useT();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", service: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error(t.form.errMissing);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(t.form.ok);
      setForm({ name: "", phone: "", service: "" });
    }, 900);
  };

  return (
    <div className="relative rounded-3xl bg-card p-7 lg:p-8 shadow-elegant border border-border/60">
      <div className="absolute -top-3 left-7 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium tracking-wide">
        {t.form.free}
      </div>
      <h3 className="font-display text-2xl mt-2">{t.form.title}</h3>
      <p className="text-sm text-muted-foreground mt-1">{t.form.sub}</p>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <Field label={t.form.name}>
          <input
            type="text"
            required
            maxLength={60}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder={t.form.name}
            className="w-full bg-transparent border-0 border-b border-border focus:border-primary outline-none py-2 text-base placeholder:text-muted-foreground/60 transition-colors"
          />
        </Field>
        <Field label={t.form.phone}>
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
        <Field label={t.form.service}>
          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className="w-full bg-transparent border-0 border-b border-border focus:border-primary outline-none py-2 text-base transition-colors"
          >
            <option value="">{t.form.placeholder}</option>
            {t.form.services.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </Field>

        <button
          type="submit"
          disabled={loading}
          className="group mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-4 text-base font-medium hover:bg-primary/90 transition-all disabled:opacity-60"
        >
          {loading ? t.form.sending : t.form.submit}
          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </button>
        <p className="text-xs text-muted-foreground text-center">{t.form.privacy}</p>
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

function Services() {
  const { t } = useT();
  return (
    <section id="xizmatlar" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHead eyebrow={t.services.eyebrow} title={t.services.title} />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-3xl overflow-hidden border border-border">
          {t.services.list.map((s, i) => (
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
                <span className="text-sm font-medium text-primary">{s.price} {t.services.from}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const reasonIcons = [Award, ShieldCheck, Sparkles, HeartHandshake];

function WhyUs() {
  const { t } = useT();
  return (
    <section id="nega-biz" className="py-24 lg:py-32 bg-gradient-emerald text-primary-foreground relative overflow-hidden">
      <div className="absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-accent/15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10 grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <p className="text-xs uppercase tracking-[0.25em] text-accent mb-6">{t.why.eyebrow}</p>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance">
            {t.why.title1} <em className="italic">{t.why.titleEm}</em> {t.why.title2}
          </h2>
          <p className="mt-6 text-primary-foreground/75 max-w-md text-pretty">{t.why.desc}</p>

          <div className="mt-10 grid grid-cols-3 gap-6 max-w-md">
            {t.why.stats.map((s) => (
              <Stat key={s.l} n={s.n} l={s.l} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-primary-foreground/10 rounded-3xl overflow-hidden">
          {t.why.reasons.map((r, i) => {
            const Icon = reasonIcons[i];
            return (
              <div key={r.title} className="bg-primary p-8 lg:p-10">
                <Icon className="h-7 w-7 text-accent" strokeWidth={1.4} />
                <h3 className="font-display text-xl mt-6">{r.title}</h3>
                <p className="mt-2 text-sm text-primary-foreground/70 leading-relaxed">{r.desc}</p>
              </div>
            );
          })}
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

function Faq() {
  const { t } = useT();
  return (
    <section id="savollar" className="py-24 lg:py-32 bg-secondary">
      <div className="mx-auto max-w-4xl px-6 lg:px-10">
        <SectionHead eyebrow={t.faq.eyebrow} title={t.faq.title} />

        <Accordion type="single" collapsible className="mt-12 space-y-3">
          {t.faq.items.map((f, i) => (
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
  const { t } = useT();
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-6xl px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-emerald text-primary-foreground p-10 sm:p-16 lg:p-20 text-center shadow-elegant">
          <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-accent/25 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/15 blur-3xl" />

          <p className="relative text-xs uppercase tracking-[0.25em] text-accent">{t.cta.eyebrow}</p>
          <h2 className="relative font-display text-4xl sm:text-5xl lg:text-6xl mt-5 leading-[1.05] text-balance">
            {t.cta.title1} <em className="italic">{t.cta.titleEm}</em> {t.cta.title2}
          </h2>
          <p className="relative mt-5 text-primary-foreground/80 max-w-xl mx-auto text-pretty">{t.cta.desc}</p>

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
              {t.cta.online} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useT();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 grid gap-10 md:grid-cols-3 text-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-full bg-gradient-emerald flex items-center justify-center text-primary-foreground font-display text-sm">S</span>
            <span className="font-display text-base text-foreground">Stomatolog Shaxobiddin</span>
          </div>
          <p className="text-muted-foreground mt-3">
            <a href={`tel:${PHONE.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors">
              <Phone className="h-3.5 w-3.5" /> {PHONE}
            </a>
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">{t.hours.title}</p>
          <p className="text-foreground">{t.hours.line}</p>
          <p className="text-muted-foreground inline-flex items-center gap-1.5 mt-1">
            <Clock className="h-3.5 w-3.5" /> {t.hours.time}
          </p>
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">{t.footer.directions}</p>
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-start gap-2 text-foreground hover:text-primary transition-colors"
          >
            <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" />
            <span>{t.address}</span>
          </a>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Shaxobiddin {t.footer.rights}
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
