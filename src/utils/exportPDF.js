/**
 * exportPDF.js
 * Exporta el contenido del #document-preview a un archivo PDF.
 * Usa html2pdf.js que internamente combina html2canvas + jsPDF.
 */

export async function exportToPDF(filename = 'documento') {
  const element = document.getElementById('document-preview')
  if (!element) {
    console.error('exportToPDF: no se encontró #document-preview')
    return
  }

  // Importación dinámica para no aumentar el bundle inicial
  const html2pdf = (await import('html2pdf.js')).default

  const options = {
    margin:       [10, 10, 10, 10],   // top, right, bottom, left (mm)
    filename:     `${filename}.pdf`,
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  {
      scale: 2,                        // mayor resolución
      useCORS: true,
      logging: false,
    },
    jsPDF:        {
      unit: 'mm',
      format: 'letter',               // carta (216 × 279 mm)
      orientation: 'portrait',
    },
  }

  await html2pdf().set(options).from(element).save()
}
