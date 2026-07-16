import { useState } from 'react'
import { Send, Github, Linkedin, Mail } from 'lucide-react'
import GradientText from '../components/GradientText.jsx'
import ScrollReveal from '../components/ScrollReveal.jsx'
import GlowButton from '../components/GlowButton.jsx'
import Magnetic from '../components/Magnetic.jsx'

const SOCIALS = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/LaFicelleCmoi' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/feed/' },
  { icon: Mail, label: 'Email', href: 'mailto:lois.clerc@epitech.eu' },
]

// Champ avec label flottant (style uiverse.io)
function Field({ label, name, textarea = false, value, onChange }) {
  const Tag = textarea ? 'textarea' : 'input'
  return (
    <div className="relative">
      <Tag
        id={name}
        name={name}
        required
        value={value}
        onChange={onChange}
        rows={textarea ? 5 : undefined}
        placeholder=" "
        className="peer w-full rounded-xl border border-line bg-panel/60 px-4 pt-6 pb-2 text-sm text-white outline-none backdrop-blur transition-colors focus:border-cyan"
      />
      <label
        htmlFor={name}
        className="pointer-events-none absolute top-2 left-4 text-xs text-cyan transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-focus:top-2 peer-focus:text-xs peer-focus:text-cyan"
      >
        {label}
      </label>
    </div>
  )
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`[Portfolio] Message de ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:lois.clerc@epitech.eu?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="relative mx-auto max-w-3xl px-6 py-28">
      <ScrollReveal>
        <h2 className="mb-2 text-center text-sm uppercase tracking-[0.35em] text-cyan">Contact</h2>
        <p className="mb-4 text-center text-4xl font-bold">
          <GradientText>On travaille ensemble ?</GradientText>
        </p>
        <p className="mb-12 text-center text-sm text-gray-400">
          Une opportunité, une question, ou juste envie d'échanger sur un projet ? Écrivez-moi.
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <form onSubmit={onSubmit} className="border-beam rounded-3xl">
          <div className="border-beam-inner space-y-5 p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Votre nom" name="name" value={form.name} onChange={onChange} />
              <Field label="Votre email" name="email" value={form.email} onChange={onChange} />
            </div>
            <Field label="Votre message" name="message" textarea value={form.message} onChange={onChange} />
            <div className="flex justify-end">
              <GlowButton type="submit">
                <Send size={16} /> Envoyer
              </GlowButton>
            </div>
          </div>
        </form>
      </ScrollReveal>

      <ScrollReveal delay={0.2} className="mt-12 flex justify-center gap-5">
        {SOCIALS.map(({ icon: Icon, label, href }) => (
          <Magnetic key={label}>
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              className="btn-uiverse flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-panel/70 text-gray-400 backdrop-blur hover:text-cyan"
            >
              <Icon size={19} />
            </a>
          </Magnetic>
        ))}
      </ScrollReveal>
    </section>
  )
}
