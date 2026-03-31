// ─────────────────────────────────────────────────────────────────────
// 1. CONSTANCIA DE TRABAJO — basada en imagen 1
// ─────────────────────────────────────────────────────────────────────
export function ConstanciaTrabajo({ d }) {
  return (
    <div id="document-preview" className={`${paper} p-10`}>
      {/* Header: empresa + fecha */}
      <div className="flex justify-between items-start mb-2">
        <div>
          <p className="font-bold text-sm uppercase tracking-wide">
            {blank(d.empresa)}
          </p>
          {d.direccion_empresa && (
            <p className="text-xs text-gray-500 mt-0.5">
              {d.direccion_empresa}
            </p>
          )}
        </div>
        <p className="text-sm text-right whitespace-nowrap">
          {blank(d.ciudad)}, {fmtDate(d.fecha_emision)}
        </p>
      </div>

      <div className="border-b border-gray-300 my-4" />

      {/* Asunto */}
      <p className="text-center font-bold underline underline-offset-2 mb-6 text-sm">
        A Quien pueda Interesar:
      </p>

      {/* Cuerpo */}
      <p className="mb-5 text-justify">
        Por medio de la presente hacemos constar que la Ciudadana/o{" "}
        <strong>{blank(d.empleado)}</strong>
        {d.dui_empleado ? (
          <>
            , Portador del Documento Único de Identidad.{" "}
            <strong>{d.dui_empleado}</strong>,
          </>
        ) : (
          ","
        )}{" "}
        ha estado prestando sus servicios profesionales desde la fecha{" "}
        <strong>{fmtDate(d.fecha_ingreso)}</strong> a la fecha, desempeñando el
        cargo de <strong>{blank(d.cargo_empleado)}</strong>
        {d.salario ? (
          <>
            , devengando un sueldo de{" "}
            <strong>USD {parseFloat(d.salario || 0).toFixed(2)}</strong>
          </>
        ) : null}
        .
      </p>

      <p className="mb-10 text-justify">
        Durante el tiempo que ha colaborado con nuestra institucion, ha
        demostrado responsabilidad, compromiso, profesionalismo y eficiencia en
        el cumplimiento de sus labores.
      </p>

      <p className="mb-10 text-justify">
        Agradeciendo de antemano las atenciones que se sirva dar al presente,
        quedo como su más seguro servidor.
      </p>

      {/* Cierre */}
      <p className="text-center mb-10">Atentamente</p>

      {/* Firma */}
      <div className="flex flex-col items-center">
        <div className="border-b border-gray-500 w-48 mb-1" />
        <p className="font-bold text-sm text-center">
          {blank(d.representante)}
        </p>
        {d.cargo_rep && <p className="text-sm text-center">{d.cargo_rep}</p>}
      </div>

      {/* Footer */}
      {(d.direccion_empresa || d.telefono_empresa) && (
        <div className="mt-14 pt-2 border-t border-gray-200">
          <p className="text-xs text-gray-400 text-center">
            {[
              d.direccion_empresa,
              d.telefono_empresa ? `Telf. ${d.telefono_empresa}` : "",
            ]
              .filter(Boolean)
              .join(" — ")}
          </p>
        </div>
      )}
    </div>
  );
}