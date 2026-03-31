export function SolicitudBeca({ d }) {
  return (
    <div id="document-preview" className={`${paper} p-10`}>
      {/* Fecha derecha */}
      <p className="text-right mb-6 text-sm">
        {blank(d.ciudad)}, a {fmtDate(d.fecha_emision)}
      </p>

      {/* Destinatario */}
      <div className="mb-6">
        <p className="font-bold">{blank(d.destinatario)}</p>
        <p>{blank(d.cargo_dest)}</p>
        <p>{blank(d.institucion_dest)}</p>
        <p>Presente</p>
      </div>

      {/* Párrafo 1 — presentación */}
      <p className="mb-4 text-justify">
        Por medio de la presente, yo, <strong>{blank(d.solicitante)}</strong>
        {d.carnet ? `, inscrito/a con número de cuenta ${d.carnet},` : ","}{" "}
        inscrito/a en <strong>{blank(d.carrera)}</strong> en{" "}
        <strong>{blank(d.universidad)}</strong>, me dirijo a usted para
        solicitarle de la manera más atenta sea considerado/a para obtener{" "}
        <strong>{blank(d.tipo_beca, "la beca")}</strong> otorgada por esta
        Universidad a los alumnos de este nivel.
      </p>

      {/* Párrafo 2 — motivo */}
      {d.motivo && <p className="mb-4 text-justify">{d.motivo}</p>}

      {/* Párrafo 3 — logros */}
      {d.logros && <p className="mb-4 text-justify">{d.logros}</p>}

      <p className="mb-8 text-justify">
        Sin más por el momento, le agradezco de antemano y quedo a sus órdenes.
      </p>

      {/* ATENTAMENTE */}
      <p className="text-center font-bold mb-10 tracking-wide">ATENTAMENTE</p>

      {/* Firma centrada */}
      <div className="text-center">
        <div className="border-b border-gray-500 w-56 mx-auto mb-1" />
        <p className="font-semibold text-sm">{blank(d.solicitante)}</p>
        {d.correo && <p className="text-xs text-gray-600">{d.correo}</p>}
        {d.telefono && <p className="text-xs text-gray-600">{d.telefono}</p>}
      </div>
    </div>
  );
}