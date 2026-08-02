import { fmtDate, blank, paper } from "../utils/templateHelpers";

// ─────────────────────────────────────────────────────────────────────
// CONSTANCIA DE INGRESOS
// ─────────────────────────────────────────────────────────────────────
export function ConstanciaIngresos({ d }) {
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
          {d.telefono_empresa && (
            <p className="text-xs text-gray-500">{d.telefono_empresa}</p>
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
        Por medio de la presente hacemos constar que el/la Ciudadano/a{" "}
        <strong>{blank(d.empleado)}</strong>
        {d.dui_empleado ? (
          <>
            , Portador del Documento Único de Identidad.{" "}
            <strong>{d.dui_empleado}</strong>,
          </>
        ) : (
          ","
        )}{" "}
        labora en esta institución desde el{" "}
        <strong>{fmtDate(d.fecha_ingreso)}</strong>, desempeñando el cargo de{" "}
        <strong>{blank(d.cargo_empleado)}</strong>, devengando un ingreso
        mensual {d.tipo_ingreso ? `de tipo ${d.tipo_ingreso.toLowerCase()}` : ""}{" "}
        de <strong>USD {parseFloat(d.ingreso_mensual || 0).toFixed(2)}</strong>
        {d.ingreso_letras ? (
          <>
            {" "}
            ({d.ingreso_letras})
          </>
        ) : null}
        .
      </p>

      {d.antiguedad && (
        <p className="mb-5 text-justify">
          A la fecha de emisión de esta constancia, el/la empleado/a cuenta
          con una antigüedad de <strong>{d.antiguedad}</strong> dentro de la
          institución.
        </p>
      )}

      <p className="mb-10 text-justify">
        Se extiende la presente constancia a solicitud del interesado/a para{" "}
        {blank(d.proposito, "los fines que estime convenientes")}, a los{" "}
        {fmtDate(d.fecha_emision)}.
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
