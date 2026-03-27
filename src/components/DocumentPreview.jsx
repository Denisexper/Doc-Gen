/**
 * DocumentPreview.jsx
 * Renderiza la vista previa del documento (papel blanco estilizado).
 * Este componente tiene id="document-preview" para que html2pdf lo capture.
 * Cada tipo tiene su propio sub-componente de template.
 */

// Helper para formatear fechas
function fmtDate(dateStr) {
  if (!dateStr) return '_______________'
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('es-SV', { day: 'numeric', month: 'long', year: 'numeric' })
}

function blank(val, fallback = '_______________') {
  return val && String(val).trim() ? val : fallback
}

// ── Estilos de papel compartidos ────────────────────────────────────
const paper = 'bg-white rounded-xl shadow-lg p-8 sm:p-10 font-[Calibri,serif] text-[13px] leading-relaxed text-gray-800 min-h-[700px]'

// ── Helpers de UI de documento ────────────────────────────────────
function DocHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-6">
      <h1 className="text-lg font-bold text-gray-900 uppercase tracking-wide">{title}</h1>
      {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
      <div className="mt-3 border-b-2 border-blue-700" />
    </div>
  )
}

function Signature({ name, cargo }) {
  return (
    <div className="mt-12">
      <div className="border-b border-gray-400 w-48" />
      <p className="mt-1 font-semibold text-sm">{blank(name)}</p>
      {cargo && <p className="text-xs text-gray-500">{cargo}</p>}
    </div>
  )
}

// ── Templates por tipo ────────────────────────────────────────────

function ConstanciaTrabajo({ d }) {
  return (
    <div id="document-preview" className={paper}>
      <DocHeader title="Constancia de Trabajo" />
      <p className="mb-4">
        El/La suscrito/a <strong>{blank(d.representante)}</strong>, en calidad de{' '}
        <strong>{blank(d.cargo_rep)}</strong> de la empresa{' '}
        <strong>{blank(d.empresa)}</strong>, hace constar que:
      </p>
      <p className="text-center text-base font-bold my-4">
        {blank(d.empleado)}
        {d.dui_empleado && <span className="font-normal text-sm text-gray-500"> (DUI: {d.dui_empleado})</span>}
      </p>
      <p className="mb-3">
        Se desempeña como <strong>{blank(d.cargo_empleado)}</strong> en nuestra institución
        desde el <strong>{fmtDate(d.fecha_ingreso)}</strong>.
      </p>
      {d.salario && (
        <p className="mb-3">
          Devengando un salario mensual de <strong>USD {parseFloat(d.salario || 0).toFixed(2)}</strong>.
        </p>
      )}
      <p className="mt-4">
        La presente constancia se extiende a petición del interesado/a para los fines que estime
        conveniente, en la ciudad de <strong>{blank(d.ciudad)}</strong>, el día{' '}
        <strong>{fmtDate(d.fecha_emision)}</strong>.
      </p>
      <Signature name={d.representante} cargo={d.cargo_rep} />
    </div>
  )
}

function CartaRenuncia({ d }) {
  return (
    <div id="document-preview" className={paper}>
      <p className="text-right text-sm text-gray-500 mb-6">{fmtDate(d.fecha_emision)}</p>
      <p className="font-semibold">{blank(d.jefe)}</p>
      <p className="text-gray-500 text-xs">{blank(d.cargo_jefe)}</p>
      <p className="mb-6">{blank(d.empresa)}</p>
      <p className="mb-4">Estimado/a señor/a:</p>
      <p className="mb-4">
        Por medio de la presente, yo, <strong>{blank(d.empleado)}</strong>, que me desempeño como{' '}
        <strong>{blank(d.cargo)}</strong>, me permito comunicarle mi decisión de renunciar
        voluntariamente a mi puesto de trabajo, con un aviso previo de{' '}
        <strong>{blank(d.aviso_dias, '___')} días</strong>, siendo mi último día de labores el{' '}
        <strong>{fmtDate(d.ultimo_dia)}</strong>.
      </p>
      {d.motivo && <p className="mb-4">{d.motivo}</p>}
      {d.agradecimiento && <p className="mb-4">{d.agradecimiento}</p>}
      <p className="mb-6">Sin otro particular, me despido de usted.</p>
      <p className="mb-8">Atentamente,</p>
      <Signature name={d.empleado} cargo={d.cargo} />
    </div>
  )
}

function CartaRecomendacion({ d }) {
  return (
    <div id="document-preview" className={paper}>
      <DocHeader title="Carta de Recomendación" />
      <p className="text-right text-sm text-gray-500 mb-4">{fmtDate(d.fecha_emision)}</p>
      <p className="mb-4">A quien corresponda:</p>
      <p className="mb-4">
        Por medio de la presente, yo, <strong>{blank(d.recomendante)}</strong>,{' '}
        {blank(d.cargo_rec)} de <strong>{blank(d.empresa)}</strong>, tengo el agrado de
        recomendar a <strong>{blank(d.recomendado)}</strong>, quien se desempeñó como{' '}
        <strong>{blank(d.cargo_recomend)}</strong> durante {blank(d.tiempo_trabajo)}.
      </p>
      {d.cualidades && (
        <>
          <p className="font-semibold text-blue-700 mt-4 mb-1">Cualidades destacadas</p>
          <p className="mb-4">{d.cualidades}</p>
        </>
      )}
      {d.logros && (
        <>
          <p className="font-semibold text-blue-700 mt-4 mb-1">Logros y contribuciones</p>
          <p className="mb-4">{d.logros}</p>
        </>
      )}
      <p className="mt-4">
        Por lo expuesto, recomiendo ampliamente a <strong>{blank(d.recomendado)}</strong>{' '}
        para cualquier posición o responsabilidad que le sea encomendada.
      </p>
      <Signature name={d.recomendante} cargo={d.cargo_rec} />
      {d.contacto && <p className="text-xs text-gray-400 mt-2">Contacto: {d.contacto}</p>}
    </div>
  )
}

function SolicitudEmpleo({ d }) {
  return (
    <div id="document-preview" className={paper}>
      <p className="text-right text-sm text-gray-500 mb-6">{fmtDate(d.fecha_emision)}</p>
      <p className="font-semibold">{blank(d.empresa)}</p>
      {d.destinatario && <p className="text-gray-500 text-xs mb-4">Atención: {d.destinatario}</p>}
      <p className="mb-4">Estimados señores:</p>
      <p className="mb-4">
        Por medio de la presente, yo, <strong>{blank(d.nombre)}</strong>, {blank(d.profesion)}, con{' '}
        <strong>{blank(d.experiencia, '0')}</strong> años de experiencia, me permito postularme
        al puesto de <strong>{blank(d.puesto)}</strong>.
      </p>
      {d.habilidades && (
        <>
          <p className="font-semibold text-blue-700 mt-3 mb-1">Habilidades clave</p>
          <p className="mb-3">{d.habilidades}</p>
        </>
      )}
      {d.motivacion && (
        <>
          <p className="font-semibold text-blue-700 mt-3 mb-1">Motivación</p>
          <p className="mb-3">{d.motivacion}</p>
        </>
      )}
      <p className="mt-4">
        Quedo a su disposición para una entrevista. Pueden contactarme al{' '}
        {d.telefono && <strong>{d.telefono}</strong>} {d.telefono && d.correo && 'o por correo '}
        {d.correo && <strong>{d.correo}</strong>}.
      </p>
      <p className="mt-4 mb-6">Atentamente,</p>
      <Signature name={d.nombre} cargo={d.profesion} />
    </div>
  )
}

// ── Plantilla genérica para tipos sin template específico ────────────
function GenericPreview({ d, docType }) {
  return (
    <div id="document-preview" className={paper}>
      <DocHeader title={docType.label} />
      <div className="space-y-2">
        {docType.fields.map((field) => (
          d[field.id] ? (
            <p key={field.id}>
              <span className="font-semibold">{field.label}: </span>
              <span>{field.type === 'date' ? fmtDate(d[field.id]) : d[field.id]}</span>
            </p>
          ) : null
        ))}
      </div>
      <Signature name="" cargo="" />
    </div>
  )
}

// ── Router de templates ──────────────────────────────────────────────
const TEMPLATES = {
  'constancia-trabajo':   ConstanciaTrabajo,
  'carta-renuncia':       CartaRenuncia,
  'carta-recomendacion':  CartaRecomendacion,
  'solicitud-empleo':     SolicitudEmpleo,
}

export default function DocumentPreview({ tipo, datos, docType }) {
  const Template = TEMPLATES[tipo]

  if (Template) {
    return <Template d={datos} />
  }

  return <GenericPreview d={datos} docType={docType} />
}
