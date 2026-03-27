import { Outlet, Link, useLocation } from 'react-router-dom'
import { FileText, Home } from 'lucide-react'

export default function Layout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-brand-700 transition-colors">
              <FileText size={16} className="text-white" />
            </div>
            <span className="font-bold text-gray-900 text-lg tracking-tight">
              Doc<span className="text-brand-600">Gen</span>
            </span>
          </Link>

          {!isHome && (
            <Link
              to="/"
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              <Home size={14} />
              Inicio
            </Link>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-gray-400">
        DocGen — Genera documentos profesionales gratis
      </footer>
    </div>
  )
}
