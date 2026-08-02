export function fmtDate(dateStr) {
  if (!dateStr) return "_______________";
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("es-SV", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function blank(val, fallback = "_______________") {
  return val && String(val).trim() ? val : fallback;
}

export function calcDias(inicio, fin) {
  if (!inicio || !fin) return "___";
  const s = new Date(inicio),
    e = new Date(fin);
  return Math.max(1, Math.ceil((e - s) / 86400000) + 1);
}

export const paper =
  "bg-white rounded-xl shadow-lg font-[Calibri,Georgia,serif] text-[13px] leading-relaxed text-gray-800 min-h-[700px]";
