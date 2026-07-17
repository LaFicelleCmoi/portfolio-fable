import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send, Github, Linkedin, Mail, Radio, CheckCircle2, LoaderCircle, AlertTriangle,
  Copy, Check, Clock, MapPin, FileDown, ChevronDown, QrCode, Briefcase,
  UserPlus, Activity, CalendarCheck, Code2, Sparkles, Timer,
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import GlowButton from '../components/GlowButton.jsx'
import Magnetic from '../components/Magnetic.jsx'
import TiltCard from '../components/TiltCard.jsx'

const EMAIL = 'lois.clerc@epitech.eu'

const SUBJECTS = ['Alternance & recrutement', 'Projet & collaboration', 'Question technique', 'Parler F1 🏎️']

// Cartes d'audience : un clic présélectionne le canal et prérédige le message
const AUDIENCES = [
  {
    icon: Briefcase,
    title: 'Recruteur / RH',
    text: 'Un profil full-stack en alternance, déjà en poste chez EzDrive, qui livre et apprend vite.',
    cta: 'Parler recrutement',
    subject: SUBJECTS[0],
    template:
      "Bonjour Loïs,\n\nJe te contacte au sujet d'une opportunité chez [entreprise] : [alternance / stage / suite de cursus].\nSerais-tu disponible pour un échange cette semaine ?\n\n[Nom — entreprise]",
  },
  {
    icon: Code2,
    title: 'Développeur·se',
    text: 'Un projet à monter, une idée à débattre, une PR à review ? Le code est ma langue natale.',
    cta: 'Parler code',
    subject: SUBJECTS[1],
    template:
      "Salut Loïs !\n\nJ'ai vu ton projet [nom du repo] sur GitHub et j'aimerais échanger sur [idée / collaboration / question].\n\n[Pseudo GitHub]",
  },
  {
    icon: Sparkles,
    title: 'Curieux / Autre',
    text: "Une question sur mon parcours, Epitech, l'alternance — ou juste envie de parler Grand Prix ?",
    cta: 'Ouvrir le canal',
    subject: SUBJECTS[2],
    template: 'Bonjour Loïs,\n\n[Votre question / message]\n\n[Prénom]',
  },
]

// Ce qui se passe après l'envoi
const PIT_PROCEDURE = [
  { icon: Radio, title: 'Message reçu', text: 'Votre message arrive directement sur mon pit wall (ma boîte mail).' },
  { icon: Clock, title: 'Réponse < 48 h', text: 'Je réponds à tout le monde, généralement sous 24 à 48 h.' },
  { icon: CalendarCheck, title: 'On s\'organise', text: 'Si ça matche, on cale un call, une visio ou un café.' },
]

const FAQ = [
  {
    q: 'Tu cherches quoi en ce moment ?',
    a: "Je suis en alternance chez EzDrive en parallèle d'Epitech, donc bien occupé — mais toujours ouvert aux échanges, aux projets intéressants et aux opportunités pour la suite du cursus.",
  },
  {
    q: 'Tu réponds en combien de temps ?',
    a: 'En général sous 24 à 48 h. Pendant les périodes intenses en entreprise ou les rushs de projets Epitech, ça peut prendre un poil plus — mais je réponds toujours.',
  },
  {
    q: 'Télétravail ou présentiel ?',
    a: "Les deux : habitué au travail en équipe sur site chez EzDrive, et à l'async/remote pour les projets Epitech (Git, reviews, outils de com). Le bon setup, c'est celui du projet.",
  },
  {
    q: 'Comment tu bosses en équipe ?',
    a: "Git flow propre : branches, pull requests, revues de code, commits atomiques — ce portfolio est d'ailleurs commité fichier par fichier. Et une règle d'or : un blocage de plus de 30 minutes, ça se partage.",
  },
  {
    q: 'Ta stack de prédilection ?',
    a: "React + Node.js + PostgreSQL pour le web, Docker pour emballer le tout, et Python dès que l'IA ou l'automatisation s'invitent. J'aime aussi sortir de ma zone de confort — ce portfolio en est la preuve.",
  },
  {
    q: 'On peut parler F1 ?',
    a: 'Toujours. Surtout les week-ends de Grand Prix. Attention : je défends mes opinions sur la stratégie comme un ingénieur de course défend son undercut.',
  },
]

// Horloge locale (Paris) mise à jour en direct
function ParisClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 10000)
    return () => clearInterval(t)
  }, [])
  return now.toLocaleTimeString('fr-FR', { timeZone: 'Europe/Paris', hour: '2-digit', minute: '2-digit' })
}

// "il y a X heures/jours" en français
function relativeFr(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const rtf = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' })
  const hours = Math.round(diff / 3.6e6)
  if (hours < 1) return 'il y a moins d\'une heure'
  if (hours < 24) return rtf.format(-hours, 'hour')
  return rtf.format(-Math.round(hours / 24), 'day')
}

// Champ avec label flottant (style uiverse.io) + message d'erreur inline
function Field({ label, name, textarea = false, value, onChange, onBlur, error, maxLength }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className="relative">
      <Tag
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        rows={textarea ? 6 : undefined}
        maxLength={maxLength}
        placeholder=" "
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`peer w-full rounded-xl border bg-panel/60 px-4 pt-6 pb-2 text-sm text-white outline-none backdrop-blur transition-colors ${
          error ? 'border-f1/70 focus:border-f1' : 'border-line focus:border-cyan'
        }`}
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute top-2 left-4 text-xs text-cyan transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan"
      >
        {label}
      </label>
      {error && (
        <p id={`${name}-error`} className="mt-1 flex items-center gap-1 text-xs text-orange-400">
          <AlertTriangle size={11} /> {error}
        </p>
      )}
    </div>
  )
}

// Ligne d'info du "mur des stands"
function InfoRow({ icon: Icon, children }) {
  return (
    <li className="flex items-center gap-3 text-sm text-gray-300">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-line bg-ink/60">
        <Icon size={15} className="text-cyan" />
      </span>
      <span className="flex min-w-0 flex-1 items-center gap-2">{children}</span>
    </li>
  )
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-panel/60">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-center justify-between gap-3 px-5 py-4 text-left text-sm font-medium text-gray-200 transition-colors hover:text-white"
      >
        {q}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={16} className="text-cyan" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <p className="px-5 pb-4 text-sm leading-relaxed text-gray-400">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const validate = (f) => ({
  name: f.name.trim().length >= 2 ? '' : 'Votre nom (2 caractères minimum)',
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email) ? '' : 'Un email valide, sinon impossible de vous répondre',
  message:
    f.message.trim().length >= 20
      ? ''
      : `Un vrai message fait au moins 20 caractères (encore ${Math.max(0, 20 - f.message.trim().length)})`,
})

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', honey: '' })
  const [subject, setSubject] = useState(SUBJECTS[0])
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [copied, setCopied] = useState(false)
  const [lastActivity, setLastActivity] = useState(null)
  const formRef = useRef(null)

  // télémétrie live : dernière activité publique GitHub
  useEffect(() => {
    const cached = sessionStorage.getItem('gh-last-activity')
    if (cached) setLastActivity(cached)
    fetch('https://api.github.com/users/LaFicelleCmoi/events/public?per_page=1')
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(([e]) => {
        if (e?.created_at) {
          sessionStorage.setItem('gh-last-activity', e.created_at)
          setLastActivity(e.created_at)
        }
      })
      .catch(() => {})
  }, [])

  const errors = validate(form)
  const showError = (field) => (touched[field] ? errors[field] : '')

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })
  const onBlur = (e) => setTouched({ ...touched, [e.target.name]: true })

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.getSelection()?.selectAllChildren(document.getElementById('email-text'))
    }
  }

  // clic sur une carte d'audience : canal + modèle de message prêts à l'emploi
  const prefill = (audience) => {
    setSubject(audience.subject)
    setForm((f) => ({ ...f, message: audience.template }))
    setTouched((t) => ({ ...t, message: false }))
    setStatus('idle')
    formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => document.getElementById('name')?.focus(), 600)
  }

  const mailtoFallback = () => {
    const s = encodeURIComponent(`[Portfolio] ${subject} — ${form.name}`)
    const b = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${EMAIL}?subject=${s}&body=${b}`
  }

  // envoi réel via formsubmit.co ; en cas d'échec on PROPOSE le mailto (pas de redirection surprise)
  const onSubmit = async (e) => {
    e.preventDefault()
    setTouched({ name: true, email: true, message: true })
    if (Object.values(errors).some(Boolean)) return
    if (form.honey) return // anti-spam : un humain ne remplit pas ce champ
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          sujet: subject,
          message: form.message,
          _subject: `[Portfolio] ${subject} — ${form.name}`,
          _template: 'table',
          _captcha: 'false',
          _honey: form.honey,
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('sent')
      setForm({ name: '', email: '', message: '', honey: '' })
      setTouched({})
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeader sector="05" kicker="Contact" title="On travaille ensemble ?">
        Une opportunité, une question, ou juste envie d'échanger sur un projet ? Ouvrez la radio —
        tous les canaux mènent à moi.
      </SectionHeader>

      {/* ── cartes d'audience : à qui je parle ? ── */}
      <div className="mb-10 grid gap-5 sm:grid-cols-3">
        {AUDIENCES.map((aud, i) => (
          <ScrollReveal key={aud.title} delay={i * 0.08}>
            <TiltCard className="h-full">
              <div className="flex h-full flex-col rounded-3xl border border-line bg-panel/70 p-6 backdrop-blur transition-colors hover:border-neon/50">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-neon to-cyan">
                  <aud.icon size={19} className="text-white" />
                </span>
                <h3 className="mb-1.5 font-semibold text-white">{aud.title}</h3>
                <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-400">{aud.text}</p>
                <button
                  onClick={() => prefill(aud)}
                  className="btn-uiverse w-fit cursor-pointer rounded-xl border border-line bg-ink/60 px-4 py-2 text-xs font-semibold text-cyan transition-colors hover:border-cyan/50"
                >
                  {aud.cta} →
                </button>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* ── mur des stands : infos directes ── */}
        <ScrollReveal direction="right" className="lg:col-span-2">
          <div className="flex h-full flex-col gap-5 rounded-3xl border border-line bg-panel/70 p-7 backdrop-blur">
            <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] text-gray-500">
              <Briefcase size={13} className="text-f1" /> PIT WALL — INFOS DIRECTES
            </p>

            {/* disponibilité */}
            <div className="flex items-center gap-3 rounded-2xl border border-green-500/30 bg-green-500/10 px-4 py-3">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>
              <p className="text-sm text-green-300">
                En alternance chez EzDrive — <span className="text-green-200">ouvert aux échanges</span>
              </p>
            </div>

            <ul className="space-y-3">
              <InfoRow icon={Mail}>
                <span id="email-text" className="truncate">{EMAIL}</span>
                <button
                  onClick={copyEmail}
                  aria-label="Copier l'adresse email"
                  className="ml-auto flex shrink-0 cursor-pointer items-center gap-1 rounded-lg border border-line bg-ink/60 px-2.5 py-1.5 text-xs text-gray-400 transition-colors hover:border-cyan/50 hover:text-cyan"
                >
                  {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  {copied ? 'Copié !' : 'Copier'}
                </button>
              </InfoRow>
              <InfoRow icon={Timer}>
                Heure locale : <ParisClock /> (Paris) — créneau idéal 18 h – 21 h
              </InfoRow>
              <InfoRow icon={Clock}>Réponse sous 24 à 48 h</InfoRow>
              <InfoRow icon={MapPin}>France — télétravail friendly</InfoRow>
              {lastActivity && (
                <InfoRow icon={Activity}>
                  Dernière activité GitHub : {relativeFr(lastActivity)}
                  <span className="relative ml-1 flex h-1.5 w-1.5">
                    <span className="absolute h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
                    <span className="relative h-1.5 w-1.5 rounded-full bg-cyan" />
                  </span>
                </InfoRow>
              )}
            </ul>

            <div className="flex flex-wrap gap-3">
              <GlowButton href="/cv-lois.pdf" download className="text-xs">
                <FileDown size={15} /> Mon CV
              </GlowButton>
              <GlowButton href="/lois-clerc.vcf" download variant="ghost" className="text-xs">
                <UserPlus size={15} /> Ajouter à vos contacts
              </GlowButton>
            </div>
            <div className="flex gap-3">
              <Magnetic>
                <a
                  href="https://github.com/LaFicelleCmoi"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="btn-uiverse flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-panel/70 text-gray-400 hover:text-cyan"
                >
                  <Github size={18} />
                </a>
              </Magnetic>
              <Magnetic>
                <a
                  href="https://www.linkedin.com/in/lo%C3%AFs-clerc-a46583386/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="btn-uiverse flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-panel/70 text-gray-400 hover:text-cyan"
                >
                  <Linkedin size={18} />
                </a>
              </Magnetic>
            </div>

            {/* QR code — généré par mon propre projet qr_app 😎 */}
            <div className="mt-auto flex items-center gap-4 rounded-2xl border border-line bg-ink/50 p-4">
              <img
                src="/qr-portfolio.png"
                alt="QR code vers ce portfolio"
                width="88"
                height="88"
                loading="lazy"
                className="h-22 w-22 rounded-lg"
              />
              <p className="text-xs leading-relaxed text-gray-400">
                <QrCode size={13} className="mb-1 text-cyan" />
                Partagez ce portfolio en un scan — QR généré avec mon propre projet{' '}
                <a
                  href="https://github.com/LaFicelleCmoi/qr_app"
                  target="_blank"
                  rel="noreferrer"
                  className="text-cyan underline-offset-2 hover:underline"
                >
                  qr_app
                </a>{' '}
                🐍
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* ── team radio : le formulaire ── */}
        <ScrollReveal direction="left" delay={0.1} className="lg:col-span-3">
          <form ref={formRef} onSubmit={onSubmit} noValidate className="border-beam h-full rounded-3xl">
            <div className="border-beam-inner flex h-full flex-col gap-5 p-8">
              <p className="flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] text-gray-500">
                <Radio size={13} className="animate-pulse text-f1" /> TEAM RADIO — CANAL OUVERT
              </p>

              {/* choix du canal (sujet) */}
              <div className="flex flex-wrap gap-2" role="group" aria-label="Sujet du message">
                {SUBJECTS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSubject(s)}
                    aria-pressed={subject === s}
                    className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-xs transition-colors ${
                      subject === s
                        ? 'border-transparent bg-gradient-to-r from-neon to-cyan text-white'
                        : 'border-line bg-panel/60 text-gray-400 hover:text-white'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Votre nom" name="name" value={form.name} onChange={onChange} onBlur={onBlur} error={showError('name')} maxLength={80} />
                <Field label="Votre email" name="email" value={form.email} onChange={onChange} onBlur={onBlur} error={showError('email')} maxLength={120} />
              </div>
              <div>
                <Field label="Votre message" name="message" textarea value={form.message} onChange={onChange} onBlur={onBlur} error={showError('message')} maxLength={1000} />
                <p className="mt-1 text-right font-mono text-[10px] text-gray-500">
                  {form.message.length}/1000
                </p>
              </div>

              {/* pot de miel anti-spam : invisible pour les humains */}
              <input
                type="text"
                name="honey"
                value={form.honey}
                onChange={onChange}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="hidden"
              />

              <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                <p className="text-[11px] text-gray-400">
                  Vos infos ne servent qu'à vous répondre — rien d'autre, promis.
                </p>
                <GlowButton type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <>
                      <LoaderCircle size={16} className="animate-spin" /> Envoi…
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Envoyer
                    </>
                  )}
                </GlowButton>
              </div>

              {status === 'sent' && (
                <p className="flex items-center gap-2 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                  <CheckCircle2 size={16} /> Message transmis au stand — je vous réponds vite. Merci !
                </p>
              )}
              {status === 'error' && (
                <p className="flex flex-wrap items-center gap-2 rounded-xl border border-f1/40 bg-f1/10 px-4 py-3 text-sm text-orange-300">
                  <AlertTriangle size={16} /> Radio coupée, le message n'est pas parti.
                  <button type="button" onClick={mailtoFallback} className="cursor-pointer font-semibold text-cyan underline-offset-2 hover:underline">
                    Ouvrir votre client mail à la place →
                  </button>
                </p>
              )}
            </div>
          </form>
        </ScrollReveal>
      </div>

      {/* ── la procédure au stand : après votre message ── */}
      <ScrollReveal delay={0.1} className="mt-12">
        <p className="mb-4 text-center font-mono text-[11px] tracking-[0.3em] text-gray-500">
          APRÈS VOTRE MESSAGE — LA PROCÉDURE AU STAND
        </p>
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
          {PIT_PROCEDURE.map((step, i) => (
            <div key={step.title} className="relative rounded-2xl border border-line bg-panel/60 p-5 text-center">
              <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-f1 to-orange-600 px-2.5 py-0.5 font-mono text-[10px] font-bold text-white">
                {i + 1}
              </span>
              <step.icon size={18} className="mx-auto mb-2 text-cyan" />
              <h3 className="mb-1 text-sm font-semibold text-white">{step.title}</h3>
              <p className="text-xs leading-relaxed text-gray-400">{step.text}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* ── mini FAQ ── */}
      <ScrollReveal delay={0.15} className="mt-12">
        <p className="mb-4 text-center font-mono text-[11px] tracking-[0.3em] text-gray-500">
          BRIEFING — QUESTIONS FRÉQUENTES
        </p>
        <div className="mx-auto grid max-w-3xl gap-3">
          {FAQ.map((item) => (
            <FaqItem key={item.q} {...item} />
          ))}
        </div>
      </ScrollReveal>
    </section>
  )
}
