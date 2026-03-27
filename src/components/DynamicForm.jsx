/**
 * DynamicForm.jsx
 * Renderiza dinámicamente los campos de un formulario
 * a partir del schema definido en documentTypes.js
 */
export default function DynamicForm({ fields, values, onChange }) {
  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <Field
          key={field.id}
          field={field}
          value={values[field.id] ?? ''}
          onChange={(val) => onChange(field.id, val)}
        />
      ))}
    </div>
  )
}

function Field({ field, value, onChange }) {
  const base =
    'w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 ' +
    'focus:outline-none focus:ring-2 focus:ring-brand-400 focus:border-transparent focus:bg-white transition'

  const label = (
    <label className="block text-xs font-medium text-gray-600 mb-1">
      {field.label}
      {field.required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  )

  if (field.type === 'textarea') {
    return (
      <div>
        {label}
        <textarea
          className={`${base} resize-y min-h-[80px]`}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
        />
      </div>
    )
  }

  if (field.type === 'select') {
    return (
      <div>
        {label}
        <select
          className={base}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Seleccionar...</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    )
  }

  return (
    <div>
      {label}
      <input
        type={field.type}
        className={base}
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}
