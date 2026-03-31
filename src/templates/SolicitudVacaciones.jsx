export function SolicitudVacaciones({ d }) {
  return (
    <div id="document-preview" className={`${paper} p-10`}>
      {/* Lugar y fecha — derecha */}
      <p className="text-right mb-6 text-sm">
        {blank(d.ciudad)}, {fmtDate(d.fecha_emision)}
      </p>

      {/* Destinatario */}
      <div className="mb-6">
        <p className="font-semibold">{blank(d.empresa)}</p>
        {d.datos_empresa && (
          <p className="text-xs text-gray-600 whitespace-pre-line">
            {d.datos_empresa}
          </p>
        )}
        {d.area_departamento && (
          <p className="text-xs text-gray-600">{d.area_departamento}</p>
        )}
      </div>

      {/* Saludo */}
      <p className="mb-5">
        Estimado(a), Apreciado(a) Sr., Sra., Lic., Dr.{" "}
        <strong>{blank(d.destinatario)}</strong> / A quien corresponda:
      </p>

      {/* Cuerpo */}
      <p className="mb-4 text-justify">
        Reciba un cordial saludo. Por medio de la presente, solicito de la
        manera más atenta su autorización para tomar un período vacacional del{" "}
        <strong>{fmtDate(d.fecha_inicio)}</strong> al{" "}
        <strong>{fmtDate(d.fecha_fin)}</strong>, para retomar mis labores el{" "}
        <strong>{fmtDate(d.fecha_regreso)}</strong>.
      </p>

      {d.motivo && (
        <p className="mb-4 text-justify">
          El motivo de esta solicitud es {d.motivo}.
        </p>
      )}

      <p className="mb-8">
        Sin más por el momento, quedo en espera de su respuesta.
      </p>
      <p className="mb-10">Atentamente,</p>

      {/* Firma */}
      <div>
        <p className="mb-6 text-gray-400 text-xs italic">[Firma]</p>
        <div className="border-b border-gray-500 w-44 mb-1" />
        <p className="font-semibold text-sm">{blank(d.empleado)}</p>
        {d.area_empleado && (
          <p className="text-xs text-gray-600">{d.area_empleado}</p>
        )}
        {d.cargo_empleado && (
          <p className="text-xs text-gray-600">{d.cargo_empleado}</p>
        )}
      </div>
    </div>
  );
}