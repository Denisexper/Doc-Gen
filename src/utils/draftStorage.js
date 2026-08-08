const PREFIX = 'docgen:draft:'

export function loadDraft(tipo) {
  try {
    const raw = localStorage.getItem(PREFIX + tipo)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function saveDraft(tipo, data) {
  try {
    localStorage.setItem(PREFIX + tipo, JSON.stringify(data))
  } catch {
    // localStorage no disponible (modo privado, cuota llena, etc.)
  }
}

export function clearDraft(tipo) {
  try {
    localStorage.removeItem(PREFIX + tipo)
  } catch {
    // localStorage no disponible
  }
}
