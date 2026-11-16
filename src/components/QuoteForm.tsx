import { useRef, useState, type FormEvent } from 'react'
import { eventTypes, formatFcfa, packages, quoteForm } from '../data/site'

type Status = 'idle' | 'pending' | 'error' | 'success'

export function QuoteForm({
  packageId,
  onPackageChange,
}: {
  packageId: string
  onPackageChange: (id: string) => void
}) {
  const [status, setStatus] = useState<Status>('idle')
  const submitting = useRef(false)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current || status === 'success') return
    const form = event.currentTarget
    const body = new URLSearchParams()
    new FormData(form).forEach((value, key) => body.append(key, String(value)))
    submitting.current = true
    setStatus('pending')
    try {
      const response = await fetch(quoteForm.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok || /\bdata-netlify\s*=/i.test(await response.text()))
        throw new Error('Not accepted')
      setStatus('success')
      form.reset()
    } catch {
      setStatus('error')
    } finally {
      submitting.current = false
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="border border-cream/15 bg-ink-2 p-10">
        <p className="eyebrow mb-5">
          <span className="size-2.5 rounded-full bg-leaf" /> Demande reçue
        </p>
        <h3 className="font-display text-3xl font-bold mb-4">
          Merci ! Nous revenons vers vous rapidement.
        </h3>
        <p className="text-mute mb-8 max-w-md">
          Votre demande de devis a bien été envoyée. Nous vous recontactons pour
          préciser votre besoin et vous transmettre une proposition adaptée.
        </p>
        <button
          type="button"
          className="btn-ghost"
          onClick={() => setStatus('idle')}
        >
          Envoyer une autre demande
        </button>
      </div>
    )
  }

  return (
    <form
      name={quoteForm.name}
      method="POST"
      action={quoteForm.endpoint}
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      aria-busy={status === 'pending'}
      className="border border-cream/15 bg-ink-2 p-6 sm:p-10"
    >
      <input type="hidden" name="form-name" value={quoteForm.name} />
      <input
        type="hidden"
        name="subject"
        value="Nouvelle demande de devis — JK Event Media"
      />
      <p hidden>
        <label>
          Ne pas remplir
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <fieldset
        disabled={status === 'pending'}
        className="grid gap-x-8 gap-y-7 sm:grid-cols-2 disabled:opacity-70"
      >
        <legend className="sr-only">Votre demande de devis</legend>
        <div>
          <label htmlFor="q-name" className="form-label">
            Nom complet
          </label>
          <input
            id="q-name"
            name="name"
            autoComplete="name"
            required
            maxLength={100}
            placeholder="Ex. Aya Kouamé"
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="q-phone" className="form-label">
            Téléphone / WhatsApp
          </label>
          <input
            id="q-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={30}
            placeholder="+225 …"
            className="form-input"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="q-email" className="form-label">
            E-mail <span className="normal-case tracking-normal">(facultatif)</span>
          </label>
          <input
            id="q-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            placeholder="vous@exemple.com"
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="q-type" className="form-label">
            Type d’événement
          </label>
          <select
            id="q-type"
            name="event-type"
            required
            defaultValue=""
            className="form-input"
          >
            <option value="" disabled>
              Choisir…
            </option>
            {eventTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="q-date" className="form-label">
            Date de l’événement
          </label>
          <input
            id="q-date"
            name="event-date"
            type="date"
            required
            className="form-input [color-scheme:dark]"
          />
        </div>
        <div>
          <label htmlFor="q-location" className="form-label">
            Lieu
          </label>
          <input
            id="q-location"
            name="location"
            required
            maxLength={120}
            placeholder="Ex. Bouaké, quartier Commerce"
            className="form-input"
          />
        </div>
        <div>
          <label htmlFor="q-package" className="form-label">
            Formule souhaitée
          </label>
          <select
            id="q-package"
            name="package"
            value={packageId}
            onChange={(e) => onPackageChange(e.target.value)}
            className="form-input"
          >
            {packages.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {formatFcfa(p.price)}
              </option>
            ))}
            <option value="journee">Couverture à la journée</option>
            <option value="a-definir">Je ne sais pas encore</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="q-message" className="form-label">
            Parlez-nous de votre événement
          </label>
          <textarea
            id="q-message"
            name="message"
            required
            minLength={10}
            maxLength={2000}
            rows={4}
            placeholder="Durée souhaitée, nombre d’invités, photo et/ou vidéo, contenus en direct…"
            className="form-input resize-y"
          />
        </div>
        <div className="sm:col-span-2 flex flex-wrap items-center gap-6 pt-2">
          <button type="submit" className="btn">
            {status === 'pending' ? 'Envoi en cours…' : 'Envoyer ma demande'}
            <span aria-hidden>→</span>
          </button>
          <p className="text-sm text-mute max-w-xs">
            Sans engagement. Le devis précise le périmètre, les livrables et le
            prix.
          </p>
        </div>
      </fieldset>
      <p role="status" className="sr-only">
        {status === 'pending' ? 'Envoi de votre demande…' : ''}
      </p>
      {status === 'error' && (
        <p role="alert" className="mt-6 border-l-2 border-live pl-4 text-sm">
          Votre demande n’a pas pu être envoyée. Vos informations sont
          conservées — merci de réessayer.
        </p>
      )}
    </form>
  )
}
