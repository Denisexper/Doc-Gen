/**
 * documentTypes.js
 *
 * Schema central de todos los documentos disponibles en DocGen.
 * Cada documento define:
 *   - id: identificador único (usado en la URL /generar/:tipo)
 *   - label: nombre visible en la UI
 *   - category: categoría para agrupar en el catálogo
 *   - icon: emoji representativo
 *   - description: descripción corta
 *   - fields: array de campos del formulario
 *
 * Tipos de campo disponibles:
 *   text | textarea | date | select | email | tel | number
 */

export const CATEGORIES = {
  rrhh:       { label: 'Recursos Humanos', color: 'blue'   },
  empleo:     { label: 'Empleo',           color: 'green'  },
  personal:   { label: 'Personal / Legal', color: 'purple' },
  academico:  { label: 'Académico',        color: 'amber'  },
  comercial:  { label: 'Comercial',        color: 'rose'   },
}

export const DOCUMENT_TYPES = [
  // ── RECURSOS HUMANOS ────────────────────────────────────────────────
  {
    id: 'constancia-trabajo',
    label: 'Constancia de Trabajo',
    category: 'rrhh',
    icon: '🏢',
    description: 'Certifica que una persona trabaja en la empresa.',
    fields: [
      { id: 'empresa',          label: 'Nombre de la empresa',   type: 'text',     required: true,  placeholder: 'Empresa XYZ S.A. de C.V.' },
      { id: 'representante',    label: 'Nombre del representante', type: 'text',   required: true,  placeholder: 'Lic. Juan Pérez' },
      { id: 'cargo_rep',        label: 'Cargo del representante', type: 'text',    required: true,  placeholder: 'Gerente de Recursos Humanos' },
      { id: 'empleado',         label: 'Nombre del empleado',    type: 'text',     required: true,  placeholder: 'María López' },
      { id: 'dui_empleado',     label: 'DUI del empleado',       type: 'text',     required: false, placeholder: '00000000-0' },
      { id: 'cargo_empleado',   label: 'Cargo del empleado',     type: 'text',     required: true,  placeholder: 'Analista de Sistemas' },
      { id: 'fecha_ingreso',    label: 'Fecha de ingreso',       type: 'date',     required: true  },
      { id: 'salario',          label: 'Salario mensual (USD)',   type: 'number',   required: false, placeholder: '800.00' },
      { id: 'ciudad',           label: 'Ciudad',                 type: 'text',     required: true,  placeholder: 'San Salvador' },
      { id: 'fecha_emision',    label: 'Fecha de emisión',       type: 'date',     required: true  },
    ],
  },
  {
    id: 'permiso-laboral',
    label: 'Permiso Laboral',
    category: 'rrhh',
    icon: '📋',
    description: 'Autorización de ausencia del trabajo por motivos personales o médicos.',
    fields: [
      { id: 'empresa',        label: 'Empresa',              type: 'text',     required: true,  placeholder: 'Empresa XYZ' },
      { id: 'jefe',           label: 'Nombre del jefe/a',    type: 'text',     required: true,  placeholder: 'Ing. Ana García' },
      { id: 'cargo_jefe',     label: 'Cargo del jefe/a',     type: 'text',     required: true,  placeholder: 'Jefa de Área' },
      { id: 'empleado',       label: 'Nombre del empleado',  type: 'text',     required: true,  placeholder: 'Carlos Méndez' },
      { id: 'cargo',          label: 'Cargo del empleado',   type: 'text',     required: true,  placeholder: 'Diseñador Gráfico' },
      { id: 'motivo',         label: 'Motivo del permiso',   type: 'select',   required: true,
        options: ['Cita médica', 'Asunto personal', 'Trámite legal', 'Duelo', 'Estudio', 'Otro'] },
      { id: 'motivo_detalle', label: 'Detalle (opcional)',   type: 'textarea', required: false, placeholder: 'Describe brevemente el motivo...' },
      { id: 'fecha_inicio',   label: 'Fecha de inicio',      type: 'date',     required: true  },
      { id: 'fecha_fin',      label: 'Fecha de regreso',     type: 'date',     required: true  },
      { id: 'fecha_emision',  label: 'Fecha de solicitud',   type: 'date',     required: true  },
    ],
  },
  {
    id: 'solicitud-vacaciones',
    label: 'Solicitud de Vacaciones',
    category: 'rrhh',
    icon: '🌴',
    description: 'Solicitud formal de período vacacional.',
    fields: [
      { id: 'empresa',        label: 'Empresa',              type: 'text',   required: true,  placeholder: 'Empresa XYZ' },
      { id: 'destinatario',   label: 'Dirigido a',           type: 'text',   required: true,  placeholder: 'Lic. Roberto Flores, RRHH' },
      { id: 'empleado',       label: 'Nombre del empleado',  type: 'text',   required: true,  placeholder: 'Sara Gutiérrez' },
      { id: 'cargo',          label: 'Cargo',                type: 'text',   required: true,  placeholder: 'Contadora' },
      { id: 'dias',           label: 'Días solicitados',     type: 'number', required: true,  placeholder: '15' },
      { id: 'fecha_inicio',   label: 'Inicio de vacaciones', type: 'date',   required: true  },
      { id: 'fecha_regreso',  label: 'Fecha de regreso',     type: 'date',   required: true  },
      { id: 'fecha_emision',  label: 'Fecha de solicitud',   type: 'date',   required: true  },
    ],
  },
  {
    id: 'memorandum',
    label: 'Memorándum Interno',
    category: 'rrhh',
    icon: '📝',
    description: 'Comunicación interna oficial entre departamentos o colaboradores.',
    fields: [
      { id: 'empresa',       label: 'Empresa',              type: 'text',     required: true,  placeholder: 'Empresa XYZ' },
      { id: 'para',          label: 'Para',                 type: 'text',     required: true,  placeholder: 'Todo el personal de ventas' },
      { id: 'de',            label: 'De',                   type: 'text',     required: true,  placeholder: 'Gerencia General' },
      { id: 'asunto',        label: 'Asunto',               type: 'text',     required: true,  placeholder: 'Cambio de horario' },
      { id: 'cuerpo',        label: 'Cuerpo del mensaje',   type: 'textarea', required: true,  placeholder: 'Escriba el contenido del memorándum...' },
      { id: 'fecha_emision', label: 'Fecha',                type: 'date',     required: true  },
    ],
  },

  // ── EMPLEO ──────────────────────────────────────────────────────────
  {
    id: 'carta-renuncia',
    label: 'Carta de Renuncia',
    category: 'empleo',
    icon: '✉️',
    description: 'Notificación formal de renuncia voluntaria a un puesto de trabajo.',
    fields: [
      { id: 'empresa',        label: 'Empresa',              type: 'text',     required: true,  placeholder: 'Empresa XYZ' },
      { id: 'jefe',           label: 'Dirigido a',           type: 'text',     required: true,  placeholder: 'Lic. Pedro Ramírez' },
      { id: 'cargo_jefe',     label: 'Cargo del destinatario', type: 'text',   required: true,  placeholder: 'Director General' },
      { id: 'empleado',       label: 'Tu nombre completo',   type: 'text',     required: true,  placeholder: 'Luis Hernández' },
      { id: 'cargo',          label: 'Tu cargo actual',      type: 'text',     required: true,  placeholder: 'Desarrollador de Software' },
      { id: 'aviso_dias',     label: 'Días de aviso previo', type: 'number',   required: true,  placeholder: '15' },
      { id: 'ultimo_dia',     label: 'Último día de trabajo',type: 'date',     required: true  },
      { id: 'motivo',         label: 'Motivo (opcional)',     type: 'textarea', required: false, placeholder: 'Motivos personales / nueva oportunidad...' },
      { id: 'agradecimiento', label: 'Mensaje de agradecimiento', type: 'textarea', required: false, placeholder: 'Agradezco la oportunidad de...' },
      { id: 'fecha_emision',  label: 'Fecha de la carta',    type: 'date',     required: true  },
    ],
  },
  {
    id: 'carta-recomendacion',
    label: 'Carta de Recomendación',
    category: 'empleo',
    icon: '⭐',
    description: 'Carta que avala las habilidades y desempeño de una persona.',
    fields: [
      { id: 'empresa',         label: 'Empresa / institución', type: 'text',     required: true,  placeholder: 'Empresa XYZ' },
      { id: 'recomendante',    label: 'Quien recomienda',      type: 'text',     required: true,  placeholder: 'Lic. Carmen Vásquez' },
      { id: 'cargo_rec',       label: 'Cargo de quien recomienda', type: 'text', required: true,  placeholder: 'Gerente de Proyectos' },
      { id: 'recomendado',     label: 'Persona recomendada',   type: 'text',     required: true,  placeholder: 'Diego Morales' },
      { id: 'cargo_recomend',  label: 'Cargo que desempeñó',   type: 'text',     required: true,  placeholder: 'Analista de Datos' },
      { id: 'tiempo_trabajo',  label: 'Tiempo trabajado juntos', type: 'text',   required: true,  placeholder: '2 años y 6 meses' },
      { id: 'cualidades',      label: 'Cualidades destacadas', type: 'textarea', required: true,  placeholder: 'Responsable, proactivo, excelente trabajo en equipo...' },
      { id: 'logros',          label: 'Logros o proyectos clave', type: 'textarea', required: false, placeholder: 'Lideró el proyecto X con resultados...' },
      { id: 'contacto',        label: 'Correo de contacto',    type: 'email',    required: false, placeholder: 'contacto@empresa.com' },
      { id: 'fecha_emision',   label: 'Fecha',                 type: 'date',     required: true  },
    ],
  },
  {
    id: 'solicitud-empleo',
    label: 'Solicitud de Empleo',
    category: 'empleo',
    icon: '💼',
    description: 'Carta formal para aplicar a una oferta de trabajo.',
    fields: [
      { id: 'empresa',          label: 'Empresa a la que aplica', type: 'text',     required: true,  placeholder: 'Empresa XYZ' },
      { id: 'destinatario',     label: 'Atención a',              type: 'text',     required: false, placeholder: 'Departamento de Recursos Humanos' },
      { id: 'puesto',           label: 'Puesto al que aplica',    type: 'text',     required: true,  placeholder: 'Desarrollador Frontend' },
      { id: 'nombre',           label: 'Tu nombre completo',      type: 'text',     required: true,  placeholder: 'Andrea Salinas' },
      { id: 'profesion',        label: 'Tu profesión / título',   type: 'text',     required: true,  placeholder: 'Ingeniera en Sistemas' },
      { id: 'experiencia',      label: 'Años de experiencia',     type: 'number',   required: true,  placeholder: '3' },
      { id: 'habilidades',      label: 'Habilidades clave',       type: 'textarea', required: true,  placeholder: 'React, Node.js, trabajo en equipo...' },
      { id: 'motivacion',       label: 'Motivación',              type: 'textarea', required: true,  placeholder: '¿Por qué quieres trabajar en esta empresa?' },
      { id: 'telefono',         label: 'Teléfono de contacto',    type: 'tel',      required: true,  placeholder: '+503 7000-0000' },
      { id: 'correo',           label: 'Correo electrónico',      type: 'email',    required: true,  placeholder: 'tu@correo.com' },
      { id: 'fecha_emision',    label: 'Fecha',                   type: 'date',     required: true  },
    ],
  },
  {
    id: 'carta-presentacion',
    label: 'Carta de Presentación',
    category: 'empleo',
    icon: '📄',
    description: 'Carta que acompaña tu CV destacando tu perfil profesional.',
    fields: [
      { id: 'empresa',       label: 'Empresa',               type: 'text',     required: true,  placeholder: 'Empresa XYZ' },
      { id: 'puesto',        label: 'Puesto al que aplicas', type: 'text',     required: true,  placeholder: 'Diseñador UX/UI' },
      { id: 'nombre',        label: 'Tu nombre',             type: 'text',     required: true,  placeholder: 'Mario Ramos' },
      { id: 'perfil',        label: 'Párrafo de presentación', type: 'textarea', required: true, placeholder: 'Soy diseñador con 4 años de experiencia...' },
      { id: 'logro_clave',   label: 'Logro o proyecto destacado', type: 'textarea', required: true, placeholder: 'Lideré el rediseño de la app X aumentando...' },
      { id: 'interes',       label: '¿Por qué esta empresa?', type: 'textarea', required: true, placeholder: 'Me interesa su cultura de innovación...' },
      { id: 'correo',        label: 'Correo',                type: 'email',    required: true,  placeholder: 'tu@correo.com' },
      { id: 'telefono',      label: 'Teléfono',              type: 'tel',      required: false, placeholder: '+503 7000-0000' },
      { id: 'fecha_emision', label: 'Fecha',                 type: 'date',     required: true  },
    ],
  },

  // ── PERSONAL / LEGAL ────────────────────────────────────────────────
  {
    id: 'carta-autorizacion',
    label: 'Carta de Autorización',
    category: 'personal',
    icon: '✅',
    description: 'Autoriza a otra persona a actuar en tu nombre para un trámite.',
    fields: [
      { id: 'autorizante',      label: 'Tu nombre completo',        type: 'text',     required: true,  placeholder: 'María José Ortiz' },
      { id: 'dui_autorizante',  label: 'Tu DUI',                    type: 'text',     required: true,  placeholder: '00000000-0' },
      { id: 'autorizado',       label: 'Nombre del autorizado',     type: 'text',     required: true,  placeholder: 'Roberto Ortiz' },
      { id: 'dui_autorizado',   label: 'DUI del autorizado',        type: 'text',     required: true,  placeholder: '11111111-1' },
      { id: 'tramite',          label: 'Trámite a realizar',        type: 'textarea', required: true,  placeholder: 'Retirar mis documentos del Ministerio de...' },
      { id: 'institucion',      label: 'Institución',               type: 'text',     required: true,  placeholder: 'Banco Nacional' },
      { id: 'vigencia',         label: 'Válida hasta',              type: 'date',     required: false },
      { id: 'ciudad',           label: 'Ciudad',                    type: 'text',     required: true,  placeholder: 'San Salvador' },
      { id: 'fecha_emision',    label: 'Fecha de emisión',          type: 'date',     required: true  },
    ],
  },
  {
    id: 'declaracion-jurada',
    label: 'Declaración Jurada',
    category: 'personal',
    icon: '⚖️',
    description: 'Declaración bajo juramento de un hecho o situación.',
    fields: [
      { id: 'declarante',    label: 'Nombre del declarante',   type: 'text',     required: true,  placeholder: 'Carlos Vega' },
      { id: 'dui',           label: 'DUI',                     type: 'text',     required: true,  placeholder: '00000000-0' },
      { id: 'profesion',     label: 'Profesión/Ocupación',     type: 'text',     required: true,  placeholder: 'Comerciante' },
      { id: 'domicilio',     label: 'Domicilio',               type: 'text',     required: true,  placeholder: 'Colonia Escalón, San Salvador' },
      { id: 'declaracion',   label: 'Contenido de la declaración', type: 'textarea', required: true, placeholder: 'Declaro bajo juramento que...' },
      { id: 'proposito',     label: 'Propósito / destinatario', type: 'text',    required: true,  placeholder: 'Presentar ante la institución X' },
      { id: 'ciudad',        label: 'Ciudad',                  type: 'text',     required: true,  placeholder: 'San Salvador' },
      { id: 'fecha_emision', label: 'Fecha',                   type: 'date',     required: true  },
    ],
  },
  {
    id: 'carta-compromiso',
    label: 'Carta de Compromiso',
    category: 'personal',
    icon: '🤝',
    description: 'Formaliza un acuerdo o compromiso entre partes.',
    fields: [
      { id: 'empresa_o_persona', label: 'Emisor (persona o empresa)', type: 'text',     required: true,  placeholder: 'Juan Salinas / Empresa ABC' },
      { id: 'destinatario',      label: 'Destinatario',               type: 'text',     required: true,  placeholder: 'Institución o persona' },
      { id: 'compromiso',        label: 'Descripción del compromiso', type: 'textarea', required: true,  placeholder: 'Me comprometo a entregar...' },
      { id: 'plazo',             label: 'Fecha límite del compromiso', type: 'date',    required: true  },
      { id: 'consecuencias',     label: 'Consecuencias de incumplimiento', type: 'textarea', required: false, placeholder: 'En caso de incumplimiento...' },
      { id: 'ciudad',            label: 'Ciudad',                     type: 'text',     required: true,  placeholder: 'San Salvador' },
      { id: 'fecha_emision',     label: 'Fecha de emisión',           type: 'date',     required: true  },
    ],
  },

  // ── ACADÉMICO ───────────────────────────────────────────────────────
  {
    id: 'constancia-estudios',
    label: 'Constancia de Estudios',
    category: 'academico',
    icon: '🎓',
    description: 'Certifica que un estudiante está activo en una institución educativa.',
    fields: [
      { id: 'institucion',    label: 'Institución educativa', type: 'text',   required: true,  placeholder: 'Universidad de El Salvador' },
      { id: 'representante',  label: 'Emitida por',           type: 'text',   required: true,  placeholder: 'Lic. Ana Pérez, Registro Académico' },
      { id: 'estudiante',     label: 'Nombre del estudiante', type: 'text',   required: true,  placeholder: 'José Alfredo Cruz' },
      { id: 'carnet',         label: 'Número de carnet',      type: 'text',   required: false, placeholder: 'CR-2020-001' },
      { id: 'carrera',        label: 'Carrera / Programa',    type: 'text',   required: true,  placeholder: 'Licenciatura en Informática' },
      { id: 'ciclo',          label: 'Ciclo o año actual',    type: 'text',   required: true,  placeholder: 'V Año, Ciclo I 2025' },
      { id: 'jornada',        label: 'Jornada',               type: 'select', required: true,
        options: ['Diurna', 'Nocturna', 'Mixta', 'Virtual', 'Fin de semana'] },
      { id: 'proposito',      label: 'Propósito',             type: 'text',   required: true,  placeholder: 'Trámite de beca' },
      { id: 'ciudad',         label: 'Ciudad',                type: 'text',   required: true,  placeholder: 'San Salvador' },
      { id: 'fecha_emision',  label: 'Fecha de emisión',      type: 'date',   required: true  },
    ],
  },
  {
    id: 'solicitud-beca',
    label: 'Solicitud de Beca',
    category: 'academico',
    icon: '🏆',
    description: 'Carta formal para solicitar una beca o apoyo económico educativo.',
    fields: [
      { id: 'institucion',     label: 'Institución / organismo', type: 'text',     required: true,  placeholder: 'Ministerio de Educación' },
      { id: 'destinatario',    label: 'Dirigido a',              type: 'text',     required: true,  placeholder: 'Comité de Becas' },
      { id: 'solicitante',     label: 'Tu nombre completo',      type: 'text',     required: true,  placeholder: 'Valeria Mejía' },
      { id: 'carrera',         label: 'Carrera que estudias',    type: 'text',     required: true,  placeholder: 'Ingeniería Industrial' },
      { id: 'universidad',     label: 'Universidad',             type: 'text',     required: true,  placeholder: 'Universidad Nacional' },
      { id: 'promedio',        label: 'Promedio académico',      type: 'text',     required: true,  placeholder: '8.5 / 10' },
      { id: 'tipo_beca',       label: 'Tipo de beca solicitada', type: 'text',     required: true,  placeholder: 'Beca de excelencia académica' },
      { id: 'motivo',          label: 'Motivo de la solicitud',  type: 'textarea', required: true,  placeholder: 'Mi situación económica...' },
      { id: 'logros',          label: 'Logros académicos',       type: 'textarea', required: false, placeholder: 'Primer lugar en...' },
      { id: 'correo',          label: 'Correo electrónico',      type: 'email',    required: true,  placeholder: 'tu@correo.com' },
      { id: 'fecha_emision',   label: 'Fecha',                   type: 'date',     required: true  },
    ],
  },

  // ── COMERCIAL ───────────────────────────────────────────────────────
  {
    id: 'cotizacion',
    label: 'Cotización de Servicios',
    category: 'comercial',
    icon: '💰',
    description: 'Propuesta formal de precio para un producto o servicio.',
    fields: [
      { id: 'empresa_emisora',  label: 'Tu empresa',               type: 'text',     required: true,  placeholder: 'Studio Creativo SRL' },
      { id: 'contacto_emisor',  label: 'Tu contacto / correo',     type: 'email',    required: true,  placeholder: 'ventas@studio.com' },
      { id: 'cliente',          label: 'Cliente',                  type: 'text',     required: true,  placeholder: 'Empresa Cliente SA' },
      { id: 'contacto_cliente', label: 'Contacto del cliente',     type: 'text',     required: false, placeholder: 'Lic. Roberto Díaz' },
      { id: 'numero_cotizacion',label: 'N° de cotización',         type: 'text',     required: true,  placeholder: 'COT-2025-001' },
      { id: 'descripcion',      label: 'Descripción del servicio', type: 'textarea', required: true,  placeholder: 'Diseño y desarrollo de sitio web...' },
      { id: 'monto',            label: 'Monto total (USD)',        type: 'number',   required: true,  placeholder: '1500.00' },
      { id: 'incluye',          label: 'Incluye',                  type: 'textarea', required: true,  placeholder: '- Diseño UI/UX\n- Desarrollo frontend\n- 3 revisiones' },
      { id: 'plazo_entrega',    label: 'Plazo de entrega',         type: 'text',     required: true,  placeholder: '30 días hábiles' },
      { id: 'validez',          label: 'Validez de la cotización', type: 'text',     required: true,  placeholder: '30 días' },
      { id: 'fecha_emision',    label: 'Fecha',                    type: 'date',     required: true  },
    ],
  },
  {
    id: 'carta-cobro',
    label: 'Carta de Cobro',
    category: 'comercial',
    icon: '💳',
    description: 'Recordatorio formal de pago pendiente.',
    fields: [
      { id: 'empresa_emisora',  label: 'Tu empresa',                type: 'text',   required: true,  placeholder: 'Empresa Proveedora SA' },
      { id: 'cliente',          label: 'Cliente / deudor',          type: 'text',   required: true,  placeholder: 'Cliente ABC' },
      { id: 'monto',            label: 'Monto pendiente (USD)',     type: 'number', required: true,  placeholder: '500.00' },
      { id: 'concepto',         label: 'Concepto',                  type: 'text',   required: true,  placeholder: 'Servicios de consultoría - Enero 2025' },
      { id: 'fecha_vencimiento',label: 'Fecha de vencimiento',      type: 'date',   required: true  },
      { id: 'numero_factura',   label: 'N° de factura',             type: 'text',   required: false, placeholder: 'FAC-2025-0042' },
      { id: 'cuenta_banco',     label: 'Datos de pago',             type: 'textarea', required: false, placeholder: 'Banco: X\nCuenta: 000-000-000' },
      { id: 'contacto',         label: 'Contacto para consultas',   type: 'email',  required: true,  placeholder: 'cobros@empresa.com' },
      { id: 'fecha_emision',    label: 'Fecha de la carta',         type: 'date',   required: true  },
    ],
  },
]

/**
 * Helper: devuelve un documento por su id
 */
export function getDocumentType(id) {
  return DOCUMENT_TYPES.find((d) => d.id === id) || null
}

/**
 * Helper: devuelve los documentos agrupados por categoría
 */
export function getDocumentsByCategory() {
  return Object.entries(CATEGORIES).map(([catId, catMeta]) => ({
    id: catId,
    ...catMeta,
    documents: DOCUMENT_TYPES.filter((d) => d.category === catId),
  }))
}
