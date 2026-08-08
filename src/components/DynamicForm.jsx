/**
 * DynamicForm.jsx
 * Renderiza dinámicamente los campos de un formulario
 * a partir del schema definido en documentTypes.js
 */
export default function DynamicForm({ fields, values, onChange, errors = {} }) {
  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <Field
          key={field.id}
          field={field}
          value={values[field.id] ?? ''}
          onChange={(val) => onChange(field.id, val)}
          error={errors[field.id]}
        />
      ))}
    </div>
  )
}

function Field({ field, value, onChange, error }) {
  const base =
    'w-full rounded-lg border bg-gray-50 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 ' +
    'focus:outline-none focus:ring-2 focus:border-transparent focus:bg-white transition ' +
    (error
      ? 'border-red-300 focus:ring-red-400'
      : 'border-gray-200 focus:ring-brand-400')

  const label = (
    <label htmlFor={field.id} className="block text-xs font-medium text-gray-600 mb-1">
      {field.label}
      {field.required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  )

  const errorMsg = error && (
    <p className="text-xs text-red-500 mt-1">{error}</p>
  )

  if (field.type === 'textarea') {
    return (
      <div>
        {label}
        <textarea
          id={field.id}
          className={`${base} resize-y min-h-[80px]`}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
        />
        {errorMsg}
      </div>
    )
  }

  if (field.type === 'select') {
    return (
      <div>
        {label}
        <select
          id={field.id}
          className={base}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Seleccionar...</option>
          {field.options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errorMsg}
      </div>
    )
  }

  return (
    <div>
      {label}
      <input
        id={field.id}
        type={field.type}
        className={base}
        placeholder={field.placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {errorMsg}
    </div>
  )
}
