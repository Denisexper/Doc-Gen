# DocGen — Generador de Documentos Profesionales

Sistema frontend en React para generar documentos profesionales descargables en **PDF** y **Word (.docx)**.

## 🚀 Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir en el navegador
# http://localhost:5173
```

## 🛠️ Stack tecnológico

| Herramienta | Uso |
|---|---|
| React 18 + Vite | Framework y bundler |
| React Router DOM v6 | Navegación SPA |
| Tailwind CSS | Estilos |
| html2pdf.js | Exportación a PDF |
| docx | Generación de archivos Word (.docx) en el browser |
| file-saver | Descarga de archivos |
| lucide-react | Íconos |


## 📄 Documentos disponibles (Fase 1)

### Recursos Humanos
- Constancia de Trabajo
- Permiso Laboral
- Solicitud de Vacaciones

### Empleo
- Carta de Renuncia
- Carta de Recomendación
- Solicitud de Empleo

### Académico
- Constancia de Estudios
- Solicitud de Beca

## ➕ Agregar un nuevo tipo de documento

1. **Agregar el schema** en `src/data/documentTypes.js` dentro de `DOCUMENT_TYPES`
2. **Crear el template visual** en `src/components/DocumentPreview.jsx`
3. **Crear el builder Word** en `src/utils/exportWord.js` dentro de `BUILDERS`

¡Y listo! El routing y el formulario se generan automáticamente.
