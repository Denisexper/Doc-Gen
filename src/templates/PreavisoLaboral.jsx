export function PreavisoLaboral({ d }) {
  // Ajustamos el padding y eliminamos alturas fijas para evitar la hoja en blanco
  return (
    <div
      id="document-preview"
      className={`${paper} p-10 text-gray-800 leading-normal text-sm`}
    >
      {/* Título - Reducido para que no ocupe tanto espacio */}
      <div className="text-center mb-6">
        <h1 className="text-xl font-bold uppercase tracking-widest border-b-2 border-gray-800 pb-1 inline-block">
          Preaviso Laboral
        </h1>
      </div>

      {/* Empresa */}
      <div className="mb-6 text-center">
        <p className="text-lg font-bold uppercase">
          {blank(d.empresa, "[Nombre de la Empresa]")}
        </p>
        <p className="font-bold mt-1 italic">Presente.</p>
      </div>

      {/* Cuerpo del Texto */}
      <div className="space-y-4 text-justify">
        <p>
          Por este medio, interpongo mi preaviso de la{" "}
          <strong>Renuncia Voluntaria</strong> para dar cumplimiento al{" "}
          <span className="font-semibold">
            Art. 2 de la Ley Reguladora de Prestación Económica por Renuncia
            Voluntaria
          </span>
          , según Decreto <strong>Legislativo 592</strong>, la cual surtirá
          efecto a partir del día:
        </p>

        {/* Fecha de Salida */}
        <div className="py-2 text-center">
          <div className="inline-block border-b border-gray-800 pb-1 px-4">
            <span className="text-base font-bold italic">
              {fmtDate(d.fecha_ultimo_dia)}
            </span>
          </div>
          <p className="text-[10px] uppercase text-gray-400 mt-1 font-bold">
            (Último día de labores)
          </p>
        </div>

        <p>
          Agradezco la oportunidad que se me otorgó por prestar mis servicios a
          dicha empresa desde el día <strong>{fmtDate(d.fecha_ingreso)}</strong>
          , fecha en la cual inicié mis funciones según contrato laboral.
        </p>
      </div>

      {/* Lugar y Fecha */}
      <div className="mt-6 mb-8 italic">
        San Salvador, {fmtDate(d.fecha_presentacion)}
      </div>

      {/* Sección de Firmas - Usamos flex para mejor control de espacio */}
      <div className="space-y-8">
        {/* Firma Trabajador */}
        <div className="w-64">
          <div className="border-b border-gray-800 mb-1 w-full h-8"></div>
          <p className="font-bold uppercase text-xs">{blank(d.empleado, "")}</p>
          <p className="text-[10px] text-gray-600">DUI: {blank(d.dui, "")}</p>
          <p className="text-[9px] font-bold text-blue-900 uppercase mt-0.5">
            Firma del Trabajador
          </p>
        </div>

        {/* Firma Recibido Empleador */}
        <div className="pt-4 border-t border-dashed border-gray-200">
          <p className="font-bold text-[10px] text-gray-500 mb-2 uppercase">
            Recibido por el Empleador (Día y Hora) — Art. 4 Decreto 592
          </p>
          <div className="border-b border-gray-800 w-64 h-8"></div>
          <p className="text-[9px] font-bold text-gray-400 mt-0.5 uppercase">
            Sello y Firma de Recepción
          </p>
        </div>
      </div>
    </div>
  );
}