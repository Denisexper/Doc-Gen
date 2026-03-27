import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, convertInchesToTwip,
} from 'docx'
import { saveAs } from 'file-saver'

const COLOR = {
  primary: '1E42C8',
  dark:    '1B2A69',
  gray:    '6B7280',
  black:   '111827',
}
const FONT = 'Calibri'

// ── Helpers ──────────────────────────────────────────────────────────

function run(text, opts = {}) {
  return new TextRun({
    text: String(text ?? ''),
    font: FONT,
    size: opts.size ?? 22,
    bold: opts.bold ?? false,
    color: opts.color ?? COLOR.black,
    italics: opts.italics ?? false,
    underline: opts.underline ? {} : undefined,
    ...opts,
  })
}

function para(children, opts = {}) {
  return new Paragraph({
    children: Array.isArray(children) ? children : [children],
    alignment: opts.align ?? AlignmentType.LEFT,
    spacing: { after: opts.spaceAfter ?? 160, before: opts.spaceBefore ?? 0 },
    border: opts.borderBottom
      ? { bottom: { color: COLOR.primary, style: BorderStyle.SINGLE, size: 4, space: 4 } }
      : undefined,
    ...opts,
  })
}

function empty(space = 80) { return para([run('')], { spaceAfter: space }) }

function divider() {
  return new Paragraph({
    border: { bottom: { color: COLOR.primary, style: BorderStyle.SINGLE, size: 4, space: 4 } },
    spacing: { after: 200 },
  })
}

function sig(name, cargo = '') {
  return [
    empty(300),
    para([run('___________________________', { color: COLOR.gray })]),
    para([run(name, { bold: true })], { spaceAfter: 40 }),
    cargo ? para([run(cargo, { size: 20, color: COLOR.gray })], { spaceAfter: 40 }) : empty(40),
  ]
}

function fmtDate(s) {
  if (!s) return '_______________'
  const d = new Date(s + 'T12:00:00')
  return d.toLocaleDateString('es-SV', { day: 'numeric', month: 'long', year: 'numeric' })
}

function calcDias(ini, fin) {
  if (!ini || !fin) return '___'
  return String(Math.max(1, Math.ceil((new Date(fin) - new Date(ini)) / 86400000) + 1))
}

const margins = {
  top: convertInchesToTwip(1),
  bottom: convertInchesToTwip(1),
  left: convertInchesToTwip(1.25),
  right: convertInchesToTwip(1.25),
}

// ── Función pública ───────────────────────────────────────────────────
export async function exportToWord(tipo, datos, filename = 'documento') {
  const builder = BUILDERS[tipo]
  if (!builder) throw new Error(`Sin builder Word para: ${tipo}`)
  const doc = builder(datos)
  const blob = await Packer.toBlob(doc)
  saveAs(blob, `${filename}.docx`)
}

// ── Builders ─────────────────────────────────────────────────────────
const BUILDERS = {

  // 1. CONSTANCIA DE TRABAJO
  'constancia-trabajo': (d) => new Document({
    sections: [{
      properties: { page: { margin: margins } },
      children: [
        // Header: empresa | fecha
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
          rows: [new TableRow({ children: [
            new TableCell({ width: { size: 60, type: WidthType.PERCENTAGE }, borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }, children: [
              para([run(d.empresa || '', { bold: true, size: 22 })], { spaceAfter: 40 }),
              d.direccion_empresa ? para([run(d.direccion_empresa, { size: 18, color: COLOR.gray })], { spaceAfter: 0 }) : empty(0),
            ]}),
            new TableCell({ width: { size: 40, type: WidthType.PERCENTAGE }, borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } }, children: [
              para([run(`${d.ciudad || 'San Salvador'}, ${fmtDate(d.fecha_emision)}`, { size: 20 })], { align: AlignmentType.RIGHT }),
            ]}),
          ]})],
        }),
        divider(),
        empty(120),
        para([run('A Quien pueda Interesar:', { bold: true, underline: true })], { align: AlignmentType.CENTER, spaceAfter: 280 }),
        para([
          run('Por medio de la presente hacemos constar que la Ciudadana/o '),
          run(d.empleado || '_______________', { bold: true }),
          d.dui_empleado ? run(`, titular de la C.I. ${d.dui_empleado},`) : run(','),
          run(' labora en esta empresa desde el día '),
          run(fmtDate(d.fecha_ingreso), { bold: true }),
          run(' a la fecha, desempeñando un cargo de '),
          run(d.cargo_empleado || '_______________', { bold: true }),
          d.salario ? run(`, devengando un sueldo de USD ${parseFloat(d.salario).toFixed(2)}`) : run(''),
          run('.'),
        ], { align: AlignmentType.JUSTIFIED, spaceAfter: 220 }),
        para([run('Agradeciendo de antemano las atenciones que se sirva dar al presente, quedo como su más seguro servidor.')], { align: AlignmentType.JUSTIFIED, spaceAfter: 400 }),
        para([run('Atentamente')], { align: AlignmentType.CENTER, spaceAfter: 300 }),
        ...sig(d.representante || '', d.cargo_rep || ''),
        empty(200),
        (d.direccion_empresa || d.telefono_empresa)
          ? para([run([d.direccion_empresa, d.telefono_empresa ? `Telf. ${d.telefono_empresa}` : ''].filter(Boolean).join(' — '), { size: 18, color: COLOR.gray })], { align: AlignmentType.CENTER })
          : empty(0),
      ],
    }],
  }),

  // 2. PERMISO LABORAL
  'permiso-laboral': (d) => new Document({
    sections: [{
      properties: { page: { margin: margins } },
      children: [
        para([run('Carta de permiso laboral', { bold: true, size: 26, color: COLOR.dark })], {
          border: { left: { color: COLOR.primary, style: BorderStyle.SINGLE, size: 16, space: 8 } },
          spaceAfter: 280,
        }),
        para([run(d.empresa || '', { bold: true })], { spaceAfter: 40 }),
        d.direccion_empresa ? para([run(d.direccion_empresa, { size: 20, color: COLOR.gray })], { spaceAfter: 40 }) : empty(0),
        d.telefono_empresa  ? para([run(d.telefono_empresa,  { size: 20, color: COLOR.gray })], { spaceAfter: 40 }) : empty(0),
        empty(80),
        para([run(fmtDate(d.fecha_emision), { size: 20 })], { spaceAfter: 200 }),
        para([run(d.empleado || '', { bold: true })], { spaceAfter: 40 }),
        d.cargo_empleado ? para([run(d.cargo_empleado, { size: 20, color: COLOR.gray })], { spaceAfter: 40 }) : empty(0),
        d.departamento   ? para([run(d.departamento,   { size: 20, color: COLOR.gray })], { spaceAfter: 40 }) : empty(0),
        empty(80),
        para([run('Estimado/a '), run(d.jefe || '_______________', { bold: true }), run(':')], { spaceAfter: 200 }),
        para([
          run('Me dirijo a usted para solicitar formalmente un permiso laboral debido a '),
          run(d.motivo || '[motivo]', { bold: true }),
          run('. A continuación, detallo la información relevante para esta solicitud:'),
        ], { align: AlignmentType.JUSTIFIED, spaceAfter: 120 }),
        para([run('Fecha de inicio del permiso: ', { bold: true }), run(fmtDate(d.fecha_inicio))], { spaceAfter: 80, numbering: undefined }),
        para([run('Fecha de finalización del permiso: ', { bold: true }), run(fmtDate(d.fecha_fin))], { spaceAfter: 80 }),
        para([run('Duración total del permiso: ', { bold: true }), run(`${calcDias(d.fecha_inicio, d.fecha_fin)} día(s)`)], { spaceAfter: 160 }),
        d.motivo_detalle ? para([run('El motivo de esta solicitud es '), run(d.motivo_detalle), run('.')], { align: AlignmentType.JUSTIFIED, spaceAfter: 160 }) : empty(0),
        para([run('Agradezco su comprensión y consideración en este asunto. Estoy dispuesto/a a proporcionar cualquier documentación adicional que pueda ser necesaria.')], { align: AlignmentType.JUSTIFIED, spaceAfter: 360 }),
        para([run('Atentamente,')], { spaceAfter: 360 }),
        ...sig(d.empleado || '', d.cargo_empleado || ''),
      ],
    }],
  }),

  // 3. SOLICITUD DE VACACIONES
  'solicitud-vacaciones': (d) => new Document({
    sections: [{
      properties: { page: { margin: margins } },
      children: [
        para([run(`${d.ciudad || 'San Salvador'}, ${fmtDate(d.fecha_emision)}`, { size: 20 })], { align: AlignmentType.RIGHT, spaceAfter: 280 }),
        para([run(d.empresa || '', { bold: true })], { spaceAfter: 40 }),
        d.datos_empresa    ? para([run(d.datos_empresa,    { size: 20, color: COLOR.gray })], { spaceAfter: 40 }) : empty(0),
        d.area_departamento? para([run(d.area_departamento,{ size: 20 })], { spaceAfter: 40 }) : empty(0),
        empty(80),
        para([
          run('Estimado(a), Apreciado(a) Sr., Sra., Lic., Dr. '),
          run(d.destinatario || '_______________', { bold: true }),
          run(' / A quien corresponda:'),
        ], { spaceAfter: 200 }),
        para([
          run('Por medio de la presente, solicito de la manera más atenta su autorización para tomar un período vacacional del '),
          run(fmtDate(d.fecha_inicio), { bold: true }),
          run(' al '),
          run(fmtDate(d.fecha_fin), { bold: true }),
          run(', para retomar mis labores el '),
          run(fmtDate(d.fecha_regreso), { bold: true }),
          run('.'),
        ], { align: AlignmentType.JUSTIFIED, spaceAfter: 160 }),
        d.motivo ? para([run('El motivo de esta solicitud es '), run(d.motivo), run('.')], { align: AlignmentType.JUSTIFIED, spaceAfter: 160 }) : empty(0),
        para([run('Sin más por el momento, quedo en espera de su respuesta.')], { spaceAfter: 360 }),
        para([run('Atentamente,')], { spaceAfter: 360 }),
        ...sig(d.empleado || '', [d.area_empleado, d.cargo_empleado].filter(Boolean).join(' — ')),
      ],
    }],
  }),

  // 4. PREAVISO LABORAL — tabla con bordes para simular el formulario oficial
  'carta-renuncia': (d) => {
    const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: 'auto' }
    const BORDER = { style: BorderStyle.SINGLE, size: 4, color: '555555' }
    const THICK  = { style: BorderStyle.SINGLE, size: 8, color: '333333' }

    const row = (children) => new TableRow({
      children: [new TableCell({
        width: { size: 100, type: WidthType.PERCENTAGE },
        borders: { top: BORDER, bottom: BORDER, left: THICK, right: THICK },
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        children,
      })],
    })

    return new Document({
      sections: [{
        properties: { page: { margin: margins } },
        children: [
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              // Título
              row([para([run('PREAVISO LABORAL', { bold: true, size: 28, color: COLOR.dark })], { align: AlignmentType.CENTER, spaceAfter: 0 })]),
              // Fila vacía
              row([para([run('')], { spaceAfter: 0 })]),
              // Empresa
              row([
                para([run(d.empresa || '', { bold: true, size: 22 })], { align: AlignmentType.CENTER, spaceAfter: 40 }),
                para([run('___________________________', { color: COLOR.gray, size: 20 })], { align: AlignmentType.CENTER, spaceAfter: 0 }),
              ]),
              // Presente
              row([para([run('Presente.', { bold: true })], { spaceAfter: 0 })]),
              // Texto legal
              row([para([
                run('Por este medio interpongo mi preaviso de la Renuncia Voluntaria para dar cumplimiento al '),
                run('Art.2 de la ley Reguladora de Prestación Económica por Renuncia Voluntaria', { bold: true }),
                run(', según Decreto '),
                run('Legislativo 592', { bold: true }),
                run(', la cual surtirá efecto a partir del día:'),
              ], { align: AlignmentType.JUSTIFIED, spaceAfter: 0 })]),
              // Fecha último día
              row([
                para([run(fmtDate(d.fecha_ultimo_dia), { size: 22 })], { align: AlignmentType.CENTER, spaceAfter: 40 }),
                para([run('___________________________', { color: COLOR.gray })], { align: AlignmentType.CENTER, spaceAfter: 0 }),
              ]),
              // Agradecimiento
              row([para([run('Agradezco la oportunidad que se me otorgó por prestar mis servicios a dicha empresa desde:', { bold: true })], { spaceAfter: 0 })]),
              // Fecha ingreso
              row([
                para([run(fmtDate(d.fecha_ingreso))], { spaceAfter: 40 }),
                para([run('___________________________', { color: COLOR.gray })], { spaceAfter: 0 }),
              ]),
              // Ciudad y fecha presentación
              row([para([
                run('San Salvador, ', { bold: true }),
                run(fmtDate(d.fecha_presentacion)),
              ], { spaceAfter: 0 })]),
              // Nombre trabajador
              row([
                para([run(d.empleado || '', { bold: true })], { align: AlignmentType.CENTER, spaceAfter: 40 }),
                para([run('___________________________', { color: COLOR.gray })], { align: AlignmentType.CENTER, spaceAfter: 0 }),
              ]),
              // DUI
              row([
                para([run(d.dui || '')], { align: AlignmentType.CENTER, spaceAfter: 40 }),
                para([run('___________________________', { color: COLOR.gray })], { align: AlignmentType.CENTER, spaceAfter: 0 }),
              ]),
              // Firma trabajador
              row([
                para([run('F.', { bold: true })], { spaceAfter: 300 }),
                para([run('___________________________', { color: COLOR.gray })], { spaceAfter: 0 }),
              ]),
              // Header firma empleador
              row([
                para([run('FIRMA DE RECIBIDO DEL EMPLEADOR DIA Y HORA', { bold: true, size: 18 })], { spaceAfter: 40 }),
                para([run('DE LA PRESENTACION. ART.4 DECRETO LEG. 592', { bold: true, size: 18 })], { spaceAfter: 0 }),
              ]),
              // Firma empleador
              row([
                para([run('F.', { bold: true })], { spaceAfter: 300 }),
                para([run('___________________________', { color: COLOR.gray })], { spaceAfter: 0 }),
              ]),
            ],
          }),
        ],
      }],
    })
  },

  // 5. CARTA DE RECOMENDACIÓN
  'carta-recomendacion': (d) => new Document({
    sections: [{
      properties: { page: { margin: margins } },
      children: [
        // Header tabla 2 columnas
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE }, insideH: { style: BorderStyle.NONE }, insideV: { style: BorderStyle.NONE } },
          rows: [new TableRow({ children: [
            new TableCell({
              width: { size: 55, type: WidthType.PERCENTAGE },
              borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
              children: [
                para([run(d.recomendante || '', { bold: true, size: 24 })], { spaceAfter: 40 }),
                d.direccion_rec ? para([run(d.direccion_rec, { size: 18, color: COLOR.gray })], { spaceAfter: 20 }) : empty(0),
                d.telefono_rec  ? para([run(d.telefono_rec,  { size: 18, color: COLOR.gray })], { spaceAfter: 20 }) : empty(0),
                d.correo_rec    ? para([run(d.correo_rec,    { size: 18, color: COLOR.gray })], { spaceAfter: 20 }) : empty(0),
              ],
            }),
            new TableCell({
              width: { size: 45, type: WidthType.PERCENTAGE },
              borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE }, left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
              children: [
                d.empresa           ? para([run(d.empresa,           { bold: true, size: 18 })], { align: AlignmentType.RIGHT, spaceAfter: 20 }) : empty(0),
                d.direccion_empresa ? para([run(d.direccion_empresa, { size: 18, color: COLOR.gray })], { align: AlignmentType.RIGHT, spaceAfter: 0 }) : empty(0),
              ],
            }),
          ]})],
        }),
        empty(200),
        para([run(`En ${d.ciudad || '_______________'}, el ${fmtDate(d.fecha_emision)}`, { size: 20 })], { spaceAfter: 200 }),
        para([run('Asunto: Recomendación Laboral para '), run(d.recomendado || '_______________', { bold: true })], { spaceAfter: 200 }),
        para([run('Estimado/a '), run(d.destinatario || 'a quien corresponda', { bold: true }), run(':')], { spaceAfter: 200 }),
        para([
          run('Me dirijo a usted para recomendar encarecidamente a '),
          run(d.recomendado || '_______________', { bold: true }),
          run(' para el puesto de '),
          run(d.cargo_destino || '_______________', { bold: true }),
          run('. Durante los '),
          run(d.tiempo_trabajo || '___'),
          run(' que '),
          run(d.recomendado || '_______________', { bold: true }),
          run(' trabajó con nosotros, demostró ser un profesional excepcionalmente talentoso y dedicado, destacándose en todas sus responsabilidades y superando consistentemente nuestras expectativas.'),
        ], { align: AlignmentType.JUSTIFIED, spaceAfter: 160 }),
        d.cualidades ? para([run(d.cualidades)], { align: AlignmentType.JUSTIFIED, spaceAfter: 160 }) : empty(0),
        d.logros
          ? para([run(d.logros)], { align: AlignmentType.JUSTIFIED, spaceAfter: 360 })
          : para([
              run('No dudo en recomendar a '),
              run(d.recomendado || '_______________', { bold: true }),
              run(' y estoy seguro/a de que superará las expectativas. Si requiere más información no dude en contactarme.'),
            ], { align: AlignmentType.JUSTIFIED, spaceAfter: 360 }),
        para([run('Atentamente,')], { spaceAfter: 360 }),
        ...sig(d.recomendante || '', d.cargo_actual || ''),
        d.correo_rec   ? para([run(d.correo_rec,   { size: 18, color: COLOR.gray })], { spaceAfter: 20 }) : empty(0),
        d.telefono_rec ? para([run(d.telefono_rec, { size: 18, color: COLOR.gray })]) : empty(0),
      ],
    }],
  }),

  // 6. CONSTANCIA DE ESTUDIOS
  'constancia-estudios': (d) => new Document({
    sections: [{
      properties: { page: { margin: margins } },
      children: [
        para([run(d.institucion || '', { bold: true, size: 24 })], { align: AlignmentType.CENTER, spaceAfter: 40 }),
        new Paragraph({
          border: { bottom: { color: COLOR.dark, style: BorderStyle.SINGLE, size: 8, space: 4 } },
          spacing: { after: 280 },
        }),
        para([run(`A ${fmtDate(d.fecha_emision)}${d.ciudad ? `; ${d.ciudad}` : ''}.`, { size: 20 })], { align: AlignmentType.RIGHT, spaceAfter: 240 }),
        para([run('Asunto: ', { bold: true }), run('CONSTANCIA DE ESTUDIOS', { bold: true })], { spaceAfter: 200 }),
        para([run(d.institucion || '', { bold: true }), run(', hace')], { align: AlignmentType.JUSTIFIED, spaceAfter: 80 }),
        empty(160),
        para([run('C O N S T A R', { bold: true, size: 26 })], { align: AlignmentType.CENTER, spaceAfter: 200 }),
        empty(80),
        para([
          run('que el/la estudiante '),
          run(d.estudiante || '_______________', { bold: true }),
          d.carnet ? run(`, con número de carnet ${d.carnet},`) : run(','),
          run(' forma parte del alumnado de esta institución, cursando '),
          run(d.carrera || '_______________', { bold: true }),
          run(', '),
          run(d.ciclo || '_______________', { bold: true }),
          run('.'),
        ], { align: AlignmentType.JUSTIFIED, spaceAfter: 160 }),
        para([
          run('Se extiende la presente constancia para '),
          run(d.proposito || '_______________', { bold: true }),
          run(', para el uso y fines que al interesado convenga en la fecha señalada y autorizada por esta institución.'),
        ], { align: AlignmentType.JUSTIFIED, spaceAfter: 500 }),
        para([run('___________________________', { color: COLOR.gray })], { align: AlignmentType.CENTER, spaceAfter: 40 }),
        para([run(d.representante || '', { bold: true })], { align: AlignmentType.CENTER, spaceAfter: 40 }),
        d.cargo_rep ? para([run(d.cargo_rep)], { align: AlignmentType.CENTER, spaceAfter: 40 }) : empty(0),
        empty(300),
        d.ccp ? para([run(`c.c.p. ${d.ccp}`, { size: 18, color: COLOR.gray })]) : empty(0),
      ],
    }],
  }),

  // 7. SOLICITUD DE BECA
  'solicitud-beca': (d) => new Document({
    sections: [{
      properties: { page: { margin: margins } },
      children: [
        para([run(`${d.ciudad || 'San Salvador'}, a ${fmtDate(d.fecha_emision)}`, { size: 20 })], { align: AlignmentType.RIGHT, spaceAfter: 360 }),
        para([run(d.destinatario    || '', { bold: true })], { spaceAfter: 40 }),
        para([run(d.cargo_dest      || '')], { spaceAfter: 40 }),
        para([run(d.institucion_dest|| '')], { spaceAfter: 40 }),
        para([run('Presente')], { spaceAfter: 280 }),
        para([
          run('Por medio de la presente, yo, '),
          run(d.solicitante || '_______________', { bold: true }),
          d.carnet ? run(`, inscrito/a con número de cuenta ${d.carnet},`) : run(','),
          run(' inscrito/a en '),
          run(d.carrera || '_______________', { bold: true }),
          run(' en '),
          run(d.universidad || '_______________', { bold: true }),
          run(', me dirijo a usted para solicitarle de la manera más atenta sea considerado/a para obtener '),
          run(d.tipo_beca || 'la beca', { bold: true }),
          run(' otorgada por esta Universidad.'),
        ], { align: AlignmentType.JUSTIFIED, spaceAfter: 160 }),
        d.motivo ? para([run(d.motivo)], { align: AlignmentType.JUSTIFIED, spaceAfter: 160 }) : empty(0),
        d.logros  ? para([run(d.logros)], { align: AlignmentType.JUSTIFIED, spaceAfter: 160 }) : empty(0),
        para([run('Sin más por el momento, le agradezco de antemano y quedo a sus órdenes.')], { align: AlignmentType.JUSTIFIED, spaceAfter: 360 }),
        para([run('ATENTAMENTE', { bold: true })], { align: AlignmentType.CENTER, spaceAfter: 500 }),
        para([run('___________________________', { color: COLOR.gray })], { align: AlignmentType.CENTER, spaceAfter: 40 }),
        para([run(d.solicitante || '', { bold: true })], { align: AlignmentType.CENTER, spaceAfter: 40 }),
        d.correo   ? para([run(d.correo,   { size: 20, color: COLOR.gray })], { align: AlignmentType.CENTER, spaceAfter: 20 }) : empty(0),
        d.telefono ? para([run(d.telefono, { size: 20, color: COLOR.gray })], { align: AlignmentType.CENTER }) : empty(0),
      ],
    }],
  }),
}
