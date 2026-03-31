export function PermisoLaboral({ d }) {
  const dias = calcDias(d.fecha_inicio, d.fecha_fin);

  return (
    <div id="document-preview" className={`${paper} p-10`}>
      {/* Título con borde izquierdo azul */}
      <div className="border-l-4 border-blue-700 pl-3 mb-6">
        <h1 className="text-base font-bold text-blue-900">
          Carta de permiso laboral
        </h1>
      </div>

      {/* Datos empresa */}
      <div className="mb-5">
        <p className="font-semibold">{blank(d.empresa)}</p>
        {d.direccion_empresa && (
          <p className="text-xs text-gray-600">{d.direccion_empresa}</p>
        )}
        {d.telefono_empresa && (
          <p className="text-xs text-gray-600">{d.telefono_empresa}</p>
        )}
      </div>

      <p className="mb-5 text-sm">{fmtDate(d.fecha_emision)}</p>

      {/* Datos empleado */}
      <div className="mb-5">
        <p className="font-semibold">{blank(d.empleado)}</p>
        {d.cargo_empleado && (
          <p className="text-xs text-gray-600">{d.cargo_empleado}</p>
        )}
        {d.departamento && (
          <p className="text-xs text-gray-600">{d.departamento}</p>
        )}
      </div>

      {/* Saludo */}
      <p className="mb-4">
        Estimado/a <strong>{blank(d.jefe)}</strong>:
      </p>

      {/* Cuerpo */}
      <p className="mb-4 text-justify">
        Reciba un cordial saludo. Por este medio, me dirijo a usted para
        solicitar respetuosamente permiso para ausentarme de mis actividades
        laborales debido a{" "}
        <strong>{blank(d.motivo, "[motivo del permiso]")}.</strong> A
        continuación, detallo la información relevante para esta solicitud:
      </p>

      {/* Lista de fechas */}
      <ul className="mb-4 ml-5 space-y-1.5 list-disc">
        <li>
          <span className="font-semibold">Fecha de inicio del permiso:</span>{" "}
          {fmtDate(d.fecha_inicio)}
        </li>
        <li>
          <span className="font-semibold">
            Fecha de finalización del permiso:
          </span>{" "}
          {fmtDate(d.fecha_fin)}
        </li>
        <li>
          <span className="font-semibold">Duración total del permiso:</span>{" "}
          {dias} día(s)
        </li>
      </ul>

      {d.motivo_detalle && (
        <p className="mb-4 text-justify">
          El motivo de esta solicitud es {d.motivo_detalle}.
        </p>
      )}

      <p className="mb-8 text-justify">
        Agradezco su comprensión y consideración en este asunto. Estoy
        dispuesto/a a proporcionar cualquier documentación adicional que pueda
        ser necesaria.
      </p>

      <p className="mb-10">Atentamente,</p>

      {/* Firma */}
      <div>
        <div className="border-b border-gray-500 w-44 mb-1" />
        <p className="font-semibold text-sm">{blank(d.empleado)}</p>
        {d.cargo_empleado && (
          <p className="text-xs text-gray-600">{d.cargo_empleado}</p>
        )}
        {d.departamento && (
          <p className="text-xs text-gray-600">{d.departamento}</p>
        )}
      </div>
    </div>
  );
}