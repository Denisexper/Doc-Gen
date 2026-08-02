import { ConstanciaTrabajo } from "../templates/ConstanciaTrabajo";
import { PermisoLaboral } from "../templates/PermisoLaboral";
import { SolicitudVacaciones } from "../templates/SolicitudVacaciones";
import { PreavisoLaboral } from "../templates/PreavisoLaboral";
import { CartaRecomendacion } from "../templates/CartaRecomendacion";
import { ConstanciaEstudios } from "../templates/ConstanciaEstudios";
import { SolicitudBeca } from "../templates/SolicitudBeca";
import { ConstanciaIngresos } from "../templates/ConstanciaIngresos";

// ─────────────────────────────────────────────────────────────────────
// Router de templates
// ─────────────────────────────────────────────────────────────────────
const TEMPLATES = {
  "constancia-trabajo": ConstanciaTrabajo,
  "permiso-laboral": PermisoLaboral,
  "solicitud-vacaciones": SolicitudVacaciones,
  "carta-renuncia": PreavisoLaboral,
  "carta-recomendacion": CartaRecomendacion,
  "constancia-estudios": ConstanciaEstudios,
  "solicitud-beca": SolicitudBeca,
  "constancia-ingresos": ConstanciaIngresos,
};

export default function DocumentPreview({ tipo, datos, docType }) {
  const Template = TEMPLATES[tipo];
  if (!Template)
    return (
      <div className="bg-white rounded-xl shadow-lg p-10 text-gray-400 text-center">
        Template no encontrado para: {tipo}
      </div>
    );
  return <Template d={datos} />;
}
