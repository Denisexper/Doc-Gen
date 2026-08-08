import { useState, useCallback, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download, FileText, Printer, Trash2 } from 'lucide-react'
import { getDocumentType } from '../data/documentTypes'
import DynamicForm from '../components/DynamicForm'
import DocumentPreview from '../components/DocumentPreview'
import { exportToPDF } from '../utils/exportPDF'
import { exportToWord } from '../utils/exportWord'
import { validateFields } from '../utils/validation'
import { loadDraft, saveDraft, clearDraft } from '../utils/draftStorage'

export default function Generator() {
  const { tipo } = useParams()
  const docType = getDocumentType(tipo)

  const [formData, setFormData] = useState(() => loadDraft(tipo) || {})
  const [errors, setErrors] = useState({})
  const [loadingPDF, setLoadingPDF] = useState(false)
  const [loadingWord, setLoadingWord] = useState(false)

  // Recarga el borrador si el usuario navega a otro tipo de documento
  // sin desmontar el componente (misma ruta, distinto :tipo).
  useEffect(() => {
    setFormData(loadDraft(tipo) || {})
    setErrors({})
  }, [tipo])

  // Guarda el borrador en localStorage cada vez que cambian los datos.
  useEffect(() => {
    const timer = setTimeout(() => saveDraft(tipo, formData), 300)
    return () => clearTimeout(timer)
  }, [tipo, formData])

  const handleChange = useCallback((id, value) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
    setErrors((prev) => {
      if (!prev[id]) return prev
      const next = { ...prev }
      delete next[id]
      return next
    })
  }, [])

  const handleClear = () => {
    if (!window.confirm('¿Borrar todos los datos ingresados en este formulario?')) return
    setFormData({})
    setErrors({})
    clearDraft(tipo)
  }

  if (!docType) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-500">Tipo de documento no encontrado.</p>
        <Link to="/" className="text-brand-600 underline mt-4 inline-block">Volver al inicio</Link>
      </div>
    )
  }

  const filenameBase = `${docType.label.toLowerCase().replace(/\s+/g, '-')}`

  const runValidation = () => {
    const fieldErrors = validateFields(docType.fields, formData)
    setErrors(fieldErrors)
    const firstInvalidId = Object.keys(fieldErrors)[0]
    if (firstInvalidId) {
      document.getElementById(firstInvalidId)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      document.getElementById(firstInvalidId)?.focus()
    }
    return Object.keys(fieldErrors).length === 0
  }

  const handlePDF = async () => {
    if (!runValidation()) return
    setLoadingPDF(true)
    try { await exportToPDF(filenameBase) }
    finally { setLoadingPDF(false) }
  }

  const handleWord = async () => {
    if (!runValidation()) return
    setLoadingWord(true)
    try { await exportToWord(tipo, formData, filenameBase) }
    catch (e) { console.error(e); alert('Error al generar el Word: ' + e.message) }
    finally { setLoadingWord(false) }
  }

  const handlePrint = () => window.print()

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      {/* Breadcrumb */}
      <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-6 transition-colors">
        <ArrowLeft size={14} />
        Volver al catálogo
      </Link>

      {/* Título */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-3xl">{docType.icon}</span>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{docType.label}</h1>
          <p className="text-sm text-gray-500">{docType.description}</p>
        </div>
      </div>

      {/* Grid: Formulario | Vista previa */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* ── Formulario ── */}
        <div>
          <div className="sticky top-24">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Datos del documento
                </h2>
                <button
                  type="button"
                  onClick={handleClear}
                  className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
                  title="Borrar todos los datos"
                >
                  <Trash2 size={13} />
                  Limpiar
                </button>
              </div>
              <DynamicForm
                fields={docType.fields}
                values={formData}
                onChange={handleChange}
                errors={errors}
              />
              <p className="text-xs text-gray-400 mt-4">
                Tu progreso se guarda automáticamente en este navegador.
              </p>
            </div>

            {/* Botones de exportación */}
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
              <button
                onClick={handlePDF}
                disabled={loadingPDF}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-medium text-sm px-4 py-2.5 rounded-xl transition-colors shadow-sm"
              >
                <Download size={15} />
                {loadingPDF ? 'Generando PDF...' : 'Descargar PDF'}
              </button>

              <button
                onClick={handleWord}
                disabled={loadingWord}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 disabled:opacity-60 text-gray-700 font-medium text-sm px-4 py-2.5 rounded-xl border border-gray-200 transition-colors shadow-sm"
              >
                <FileText size={15} />
                {loadingWord ? 'Generando Word...' : 'Descargar Word (.docx)'}
              </button>

              <button
                onClick={handlePrint}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-500 text-sm px-4 py-2.5 rounded-xl border border-gray-200 transition-colors shadow-sm"
                title="Imprimir"
              >
                <Printer size={15} />
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center mt-2">
              El Word es editable — puedes ajustar detalles finos después de descargar.
            </p>
          </div>
        </div>

        {/* ── Vista previa ── */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wider">
            Vista previa
          </h2>
          <div className="bg-gray-100 rounded-2xl p-4 min-h-[600px]">
            <DocumentPreview tipo={tipo} datos={formData} docType={docType} />
          </div>
        </div>
      </div>
    </div>
  )
}
