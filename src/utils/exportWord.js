/**
 * exportWord.js
 * Genera un archivo .docx editable a partir de los datos del formulario.
 * Usa la librería 'docx' (https://docx.js.org/) que funciona 100% en el browser.
 *
 * ESTRUCTURA:
 *   buildDocxDocument(tipo, datos) → Blob (.docx)
 *   exportToWord(tipo, datos, filename)
 *
 * Cada tipo de documento tiene su propia función constructora al final del archivo.
 */

import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  Header, Footer, PageNumber, NumberFormat, convertInchesToTwip,
} from 'docx'
import { saveAs } from 'file-saver'

// ── Colores y estilos reutilizables ──────────────────────────────────
const COLOR = {
  primary:   '1E42C8',
  dark:      '1B2A69',
  gray:      '6B7280',
  lightGray: 'F3F4F6',
  black:     '111827',
  white:     'FFFFFF',
}

const FONT = 'Calibri'

// ── Helpers de construcción ──────────────────────────────────────────

function run(text, opts = {}) {
  return new TextRun({
    text: String(text ?? ''),
    font: FONT,
    size: opts.size ?? 22,             // 22 half-points = 11pt
    bold: opts.bold ?? false,
    color: opts.color ?? COLOR.black,
    italics: opts.italics ?? false,
    ...opts,
  })
}

function para(children, opts = {}) {
  return new Paragraph({
    children: Array.isArray(children) ? children : [children],
    alignment: opts.align ?? AlignmentType.LEFT,
    spacing: { after: opts.spaceAfter ?? 160, before: opts.spaceBefore ?? 0 },
    ...opts,
  })
}

function emptyLine() {
  return para([run('')], { spaceAfter: 80 })
}

function heading(text, level = 1) {
  const sizes = { 1: 32, 2: 26, 3: 24 }
  return para([
    run(text, { size: sizes[level] ?? 24, bold: true, color: COLOR.dark }),
  ], { align: AlignmentType.CENTER, spaceAfter: 200 })
}

function sectionTitle(text) {
  return para([
    run(text, { size: 22, bold: true, color: COLOR.primary }),
  ], { spaceAfter: 80, spaceBefore: 200 })
}

function labelValue(label, value) {
  return para([
    run(`${label}: `, { bold: true, size: 22 }),
    run(value ?? '', { size: 22 }),
  ], { spaceAfter: 80 })
}

function dividerLine() {
  return new Paragraph({
    border: { bottom: { color: COLOR.primary, style: BorderStyle.SINGLE, size: 4, space: 4 } },
    spacing: { after: 200 },
  })
}

function signatureBlock(name, cargo = '') {
  return [
    emptyLine(),
    emptyLine(),
    para([run('___________________________', { size: 22, color: COLOR.gray })], { align: AlignmentType.LEFT }),
    para([run(name, { size: 22, bold: true })], { spaceAfter: 40 }),
    cargo ? para([run(cargo, { size: 20, color: COLOR.gray })], { spaceAfter: 40 }) : emptyLine(),
  ]
}

function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T12:00:00')
  return d.toLocaleDateString('es-SV', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ── Función pública principal ────────────────────────────────────────

export async function exportToWord(tipo, datos, filename = 'documento') {
  const builder = BUILDERS[tipo]
  if (!builder) {
    throw new Error(`No hay builder de Word para el tipo: ${tipo}`)
  }

  const doc = builder(datos)
  const blob = await Packer.toBlob(doc)
  saveAs(blob, `${filename}.docx`)
}

// ── Builders por tipo de documento ──────────────────────────────────

const BUILDERS = {

  'constancia-trabajo': (d) => new Document({
    sections: [{
      properties: { page: { margin: { top: convertInchesToTwip(1), bottom: convertInchesToTwip(1), left: convertInchesToTwip(1.25), right: convertInchesToTwip(1.25) } } },
      children: [
        heading('CONSTANCIA DE TRABAJO'),
        dividerLine(),
        emptyLine(),
        para([
          run('El/La suscrito/a ', { size: 22 }),
          run(d.representante, { size: 22, bold: true }),
          run(`, en calidad de `, { size: 22 }),
          run(d.cargo_rep, { size: 22, bold: true }),
          run(` de la empresa `, { size: 22 }),
          run(d.empresa, { size: 22, bold: true }),
          run(', hace constar que:', { size: 22 }),
        ], { spaceAfter: 200 }),
        para([
          run(d.empleado, { size: 24, bold: true }),
          d.dui_empleado ? run(` (DUI: ${d.dui_empleado})`, { size: 22, color: COLOR.gray }) : run(''),
        ], { align: AlignmentType.CENTER, spaceAfter: 100 }),
        para([
          run('Se desempeña como ', { size: 22 }),
          run(d.cargo_empleado, { size: 22, bold: true }),
          run(' en nuestra institución desde el ', { size: 22 }),
          run(formatDate(d.fecha_ingreso), { size: 22, bold: true }),
          run('.', { size: 22 }),
        ], { spaceAfter: 160 }),
        d.salario ? para([
          run('Devengando un salario mensual de ', { size: 22 }),
          run(`USD ${parseFloat(d.salario).toFixed(2)}`, { size: 22, bold: true }),
          run('.', { size: 22 }),
        ], { spaceAfter: 160 }) : emptyLine(),
        para([run('La presente constancia se extiende a petición del interesado/a para los fines que estime conveniente, en la ciudad de ', { size: 22 }),
          run(d.ciudad, { bold: true, size: 22 }), run(', el día ', { size: 22 }),
          run(formatDate(d.fecha_emision), { bold: true, size: 22 }), run('.', { size: 22 }),
        ], { spaceAfter: 400 }),
        ...signatureBlock(d.representante, d.cargo_rep),
      ],
    }],
  }),

  'carta-renuncia': (d) => new Document({
    sections: [{
      properties: { page: { margin: { top: convertInchesToTwip(1), bottom: convertInchesToTwip(1), left: convertInchesToTwip(1.25), right: convertInchesToTwip(1.25) } } },
      children: [
        para([run(formatDate(d.fecha_emision), { size: 22, color: COLOR.gray })], { align: AlignmentType.RIGHT, spaceAfter: 300 }),
        para([run(d.jefe, { size: 22, bold: true })], { spaceAfter: 40 }),
        para([run(d.cargo_jefe, { size: 22, color: COLOR.gray })], { spaceAfter: 40 }),
        para([run(d.empresa, { size: 22 })], { spaceAfter: 300 }),
        para([run('Estimado/a señor/a:', { size: 22 })], { spaceAfter: 200 }),
        para([
          run('Por medio de la presente, yo, ', { size: 22 }),
          run(d.empleado, { size: 22, bold: true }),
          run(`, que me desempeño como `, { size: 22 }),
          run(d.cargo, { size: 22, bold: true }),
          run(`, me permito comunicarle mi decisión de renunciar voluntariamente a mi puesto de trabajo, con un aviso previo de `, { size: 22 }),
          run(`${d.aviso_dias} días`, { size: 22, bold: true }),
          run(`, siendo mi último día de labores el `, { size: 22 }),
          run(formatDate(d.ultimo_dia), { size: 22, bold: true }),
          run('.', { size: 22 }),
        ], { spaceAfter: 200 }),
        d.motivo ? para([run(d.motivo, { size: 22 })], { spaceAfter: 200 }) : emptyLine(),
        d.agradecimiento ? para([run(d.agradecimiento, { size: 22 })], { spaceAfter: 200 }) : emptyLine(),
        para([run('Sin otro particular, me despido de usted.', { size: 22 })], { spaceAfter: 400 }),
        para([run('Atentamente,', { size: 22 })], { spaceAfter: 300 }),
        ...signatureBlock(d.empleado, d.cargo),
      ],
    }],
  }),

  'carta-recomendacion': (d) => new Document({
    sections: [{
      properties: { page: { margin: { top: convertInchesToTwip(1), bottom: convertInchesToTwip(1), left: convertInchesToTwip(1.25), right: convertInchesToTwip(1.25) } } },
      children: [
        heading('CARTA DE RECOMENDACIÓN'),
        dividerLine(),
        para([run(formatDate(d.fecha_emision), { size: 22, color: COLOR.gray })], { align: AlignmentType.RIGHT, spaceAfter: 300 }),
        para([run('A quien corresponda:', { size: 22 })], { spaceAfter: 200 }),
        para([
          run('Por medio de la presente, yo, ', { size: 22 }),
          run(d.recomendante, { size: 22, bold: true }),
          run(`, ${d.cargo_rec} de `, { size: 22 }),
          run(d.empresa, { size: 22, bold: true }),
          run(', tengo el agrado de recomendar a ', { size: 22 }),
          run(d.recomendado, { size: 22, bold: true }),
          run(`, quien se desempeñó como `, { size: 22 }),
          run(d.cargo_recomend, { size: 22, bold: true }),
          run(` durante ${d.tiempo_trabajo}.`, { size: 22 }),
        ], { spaceAfter: 200 }),
        sectionTitle('Cualidades destacadas'),
        para([run(d.cualidades, { size: 22 })], { spaceAfter: 200 }),
        d.logros ? sectionTitle('Logros y contribuciones') : emptyLine(),
        d.logros ? para([run(d.logros, { size: 22 })], { spaceAfter: 200 }) : emptyLine(),
        para([run('Por lo expuesto, recomiendo ampliamente a ', { size: 22 }),
          run(d.recomendado, { size: 22, bold: true }),
          run(' para cualquier posición o responsabilidad que le sea encomendada.', { size: 22 }),
        ], { spaceAfter: 400 }),
        ...signatureBlock(d.recomendante, d.cargo_rec),
        d.contacto ? para([run(`Contacto: ${d.contacto}`, { size: 20, color: COLOR.gray })]) : emptyLine(),
      ],
    }],
  }),

  // Para los demás tipos, usamos un builder genérico de fallback
}

// ── Builder genérico para documentos sin builder específico ──────────
const GENERIC_FALLBACK = (label) => (d) => new Document({
  sections: [{
    properties: { page: { margin: { top: convertInchesToTwip(1), bottom: convertInchesToTwip(1), left: convertInchesToTwip(1.25), right: convertInchesToTwip(1.25) } } },
    children: [
      heading(label.toUpperCase()),
      dividerLine(),
      emptyLine(),
      ...Object.entries(d)
        .filter(([, v]) => v)
        .map(([k, v]) => labelValue(
          k.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
          v
        )),
      emptyLine(),
      emptyLine(),
      para([run('___________________________', { size: 22, color: COLOR.gray })]),
      para([run('Firma', { size: 20, color: COLOR.gray })]),
    ],
  }],
})

// Registrar fallbacks para tipos sin builder específico
import { DOCUMENT_TYPES } from '../data/documentTypes.js'
DOCUMENT_TYPES.forEach((dt) => {
  if (!BUILDERS[dt.id]) {
    BUILDERS[dt.id] = GENERIC_FALLBACK(dt.label)
  }
})
