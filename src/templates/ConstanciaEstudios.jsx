export function ConstanciaEstudios({ d }) {
  return (
    <div id="document-preview" className={`${paper} p-10`}>
      {/* Institución */}
      <div className="text-center mb-1">
        <p className="font-bold text-sm uppercase tracking-wide">
          {blank(d.institucion)}
        </p>
      </div>
      <div className="border-b-2 border-gray-700 mb-5" />

      {/* Lugar y fecha */}
      <p className="text-right text-sm mb-5">
        A {fmtDate(d.fecha_emision)}
        {d.ciudad ? `; ${d.ciudad}` : ""}.
      </p>

      {/* Asunto */}
      <p className="mb-5">
        <strong>Asunto: </strong>
        <strong className="uppercase">Constancia de Estudios</strong>
      </p>

      {/* Párrafo apertura */}
      <p className="mb-2 text-justify">
        <strong>{blank(d.institucion)}</strong>, hace
      </p>

      {/* CONSTAR */}
      <div className="text-center my-7">
        <p className="text-lg font-bold tracking-[0.4em]">C O N S T A R</p>
      </div>

      {/* Cuerpo */}
      <p className="mb-5 text-justify">
        que el/la estudiante <strong>{blank(d.estudiante)}</strong>
        {d.carnet ? `, con número de carnet ${d.carnet},` : ","} forma parte del
        alumnado de esta institución, cursando{" "}
        <strong>{blank(d.carrera)}</strong>, <strong>{blank(d.ciclo)}</strong>.
      </p>

      <p className="mb-8 text-justify">
        Se extiende la presente constancia para{" "}
        <strong>{blank(d.proposito)}</strong>, para el uso y fines que al
        interesado convenga en la fecha señalada y autorizada por esta
        institución.
      </p>

      {/* Firma */}
      <div className="flex flex-col items-center mt-10">
        <div className="border-b border-gray-500 w-56 mb-1" />
        <p className="font-bold text-sm text-center">
          {blank(d.representante)}
        </p>
        {d.cargo_rep && <p className="text-sm text-center">{d.cargo_rep}</p>}
      </div>

      {/* CCP */}
      {d.ccp && <p className="text-xs text-gray-500 mt-10">c.c.p. {d.ccp}</p>}
    </div>
  );
}