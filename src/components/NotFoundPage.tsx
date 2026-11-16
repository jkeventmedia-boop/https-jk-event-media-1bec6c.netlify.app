import { Link } from '@tanstack/react-router'

export function NotFoundPage() {
  return (
    <main className="min-h-screen grid place-items-center p-8 text-center">
      <div>
        <p className="eyebrow mb-6 justify-center">
          <span className="live-dot" /> Signal perdu
        </p>
        <h1 className="font-display text-5xl font-bold mb-4">Page introuvable</h1>
        <p className="mb-8 text-mute">Cette page n’existe pas ou a été déplacée.</p>
        <Link to="/" className="btn">
          Retour à l’accueil
        </Link>
      </div>
    </main>
  )
}
