import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send, Github, Linkedin, Mail, Radio, CheckCircle2, LoaderCircle, AlertTriangle,
  Copy, Check, Clock, MapPin, FileDown, ChevronDown, QrCode, Briefcase,
} from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal.jsx'
import SectionHeader from '../components/SectionHeader.jsx'
import GlowButton from '../components/GlowButton.jsx'
import Magnetic from '../components/Magnetic.jsx'

const EMAIL = 'lois.clerc@epitech.eu'

const SUBJECTS = ['Alternance & recrutement', 'Projet & collaboration', 'Question technique', 'Parler F1 🏎️']

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
    q: 'Ta stack de prédilection ?',
    a: "React + Node.js + PostgreSQL pour le web, Docker pour emballer le tout, et Python dès que l'IA ou l'automatisation s'invitent. J'aime aussi sortir de ma zone de confort — ce portfolio en est la preuve.",
  },
  {
    q: 'On peut parler F1 ?',
    a: 'Toujours. Surtout les week-ends de Grand Prix. Attention : je défends mes opinions sur la stratégie comme un ingénieur de course défend son undercut.',
  },
]

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
        rows={textarea ? 5 : undefined}
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
      {children}
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
      // vieux navigateurs : on sélectionne au moins le texte
      window.getSelection()?.selectAllChildren(document.getElementById('email-text'))
    }
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
    <section id="contact" className="relative mx-auto max-w-6xl px-6 py-28">
      <SectionHeader sector="05" kicker="Contact" title="On travaille ensemble ?">
        Une opportunité, une question, ou juste envie d'échanger sur un projet ? Ouvrez la radio —
        tous les canaux mènent à moi.
      </SectionHeader>

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
                <span id="email-text" className="break-all">{EMAIL}</span>
                <button
                  onClick={copyEmail}
                  aria-label="Copier l'adresse email"
                  className="ml-auto flex cursor-pointer items-center gap-1 rounded-lg border border-line bg-ink/60 px-2.5 py-1.5 text-xs text-gray-400 transition-colors hover:border-cyan/50 hover:text-cyan"
                >
                  {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
                  {copied ? 'Copié !' : 'Copier'}
                </button>
              </InfoRow>
              <InfoRow icon={Clock}>Réponse sous 24 à 48 h</InfoRow>
              <InfoRow icon={MapPin}>France — télétravail friendly</InfoRow>
            </ul>

            <div className="flex flex-wrap gap-3">
              <GlowButton href="/cv-lois.pdf" download className="text-xs">
                <FileDown size={15} /> Mon CV
              </GlowButton>
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
                  href="https://www.linkedin.com/feed/"
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
          <form onSubmit={onSubmit} noValidate className="border-beam h-full rounded-3xl">
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
