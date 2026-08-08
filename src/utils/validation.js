export function validateFields(fields, values) {
  const errors = {}
  for (const field of fields) {
    if (!field.required) continue
    const val = values[field.id]
    if (val === undefined || val === null || String(val).trim() === '') {
      errors[field.id] = 'Este campo es obligatorio'
    }
  }
  return errors
}
