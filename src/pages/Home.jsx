import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import { getDocumentsByCategory, DOCUMENT_TYPES } from '../data/documentTypes'

const CATEGORY_COLORS = {
  rrhh:      { bg: 'bg-blue-50',   border: 'border-blue-200',  text: 'text-blue-700',  dot: 'bg-blue-500'   },
  empleo:    { bg: 'bg-green-50',  border: 'border-green-200', text: 'text-green-700', dot: 'bg-green-500'  },
  personal:  { bg: 'bg-purple-50', border: 'border-purple-200',text: 'text-purple-700',dot: 'bg-purple-500' },
  academico: { bg: 'bg-amber-50',  border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500'  },
  comercial: { bg: 'bg-rose-50',   border: 'border-rose-200',  text: 'text-rose-700',  dot: 'bg-rose-500'   },
}

export default function Home() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const categories = getDocumentsByCategory()

  const filtered = query.trim()
    ? DOCUMENT_TYPES.filter(
        (d) =>
          d.label.toLowerCase().includes(query.toLowerCase()) ||
          d.description.toLowerCase().includes(query.toLowerCase())
      )
    : null

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
      {/* Hero */}
      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 tracking-tight">
          Genera documentos<br />
          <span className="text-brand-600">profesionales al instante</span>
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Llena el formulario, obtén tu documento listo para descargar en PDF o Word. Sin registro, sin costo.
        </p>
      </div>

      {/* Buscador */}
      <div className="relative max-w-md mx-auto mb-10">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Buscar documento..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent shadow-sm transition"
        />
      </div>

      {/* Resultados de búsqueda */}
      {filtered && (
        <div className="mb-10">
          <p className="text-sm text-gray-500 mb-4">
            {filtered.length} resultado{filtered.length !== 1 ? 's' : ''} para &ldquo;{query}&rdquo;
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((doc) => (
              <DocumentCard
                key={doc.id}
                doc={doc}
                colors={CATEGORY_COLORS[doc.category]}
                onClick={() => navigate(`/generar/${doc.id}`)}
              />
            ))}
          </div>
          {filtered.length === 0 && (
            <p className="text-center text-gray-400 py-12">No se encontraron documentos.</p>
          )}
        </div>
      )}

      {/* Catálogo por categorías */}
      {!filtered &&
        categories.map((cat) => (
          <section key={cat.id} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-2.5 h-2.5 rounded-full ${CATEGORY_COLORS[cat.id]?.dot}`} />
              <h2 className="text-sm font-semibold text-gray-600 uppercase tracking-widest">
                {cat.label}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {cat.documents.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  doc={doc}
                  colors={CATEGORY_COLORS[cat.id]}
                  onClick={() => navigate(`/generar/${doc.id}`)}
                />
              ))}
            </div>
          </section>
        ))}
    </div>
  )
}

function DocumentCard({ doc, colors, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border ${colors.border} ${colors.bg} hover:shadow-md transition-all duration-150 group`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{doc.icon}</span>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${colors.text} group-hover:underline underline-offset-2`}>
            {doc.label}
          </p>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{doc.description}</p>
        </div>
      </div>
    </button>
  )
}
