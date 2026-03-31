export function CartaRecomendacion({ d }) {
  return (
    <div id="document-preview" className={`${paper} p-10`}>
      {/* Header dos columnas: remitente | empresa destino */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <p className="font-bold text-sm">{blank(d.recomendante)}</p>
          {d.direccion_rec && (
            <p className="text-xs text-gray-600 mt-0.5">{d.direccion_rec}</p>
          )}
          {d.telefono_rec && (
            <p className="text-xs text-gray-600">{d.telefono_rec}</p>
          )}
          {d.correo_rec && (
            <p className="text-xs text-gray-600">{d.correo_rec}</p>
          )}
        </div>
        <div className="text-right">
          {d.empresa && (
            <p className="text-xs font-semibold uppercase">{d.empresa}</p>
          )}
          {d.direccion_empresa && (
            <p className="text-xs text-gray-600">{d.direccion_empresa}</p>
          )}
        </div>
      </div>

      {/* Ciudad y fecha */}
      <p className="mb-5 text-sm">
        En {blank(d.ciudad)}, el {fmtDate(d.fecha_emision)}
      </p>

      {/* Asunto */}
      <p className="font-bold mb-4 text-sm">
        Asunto: Recomendación Laboral para {blank(d.recomendado)}
      </p>

      {/* Saludo */}
      <p className="mb-5">
        Estimado/a{" "}
        <strong>{blank(d.destinatario, "a quien corresponda")}</strong>:
      </p>

      {/* Párrafo 1 */}
      <p className="mb-4 text-justify">
        Me dirijo a usted para recomendar encarecidamente a{" "}
        <strong>{blank(d.recomendado)}</strong> para el puesto de{" "}
        <strong>{blank(d.cargo_destino)}</strong>. Durante los{" "}
        {blank(d.tiempo_trabajo)} que <strong>{blank(d.recomendado)}</strong>{" "}
        trabajó con nosotros en{" "}
        <strong>{blank(d.empresa, "nuestra empresa")}</strong>, demostró ser un
        profesional excepcionalmente talentoso y dedicado, destacándose en todas
        sus responsabilidades y superando consistentemente nuestras
        expectativas.
      </p>

      {/* Párrafo 2 — cualidades */}
      {d.cualidades && <p className="mb-4 text-justify">{d.cualidades}</p>}

      {/* Párrafo 3 — logros / conclusión */}
      {d.logros ? (
        <p className="mb-8 text-justify">{d.logros}</p>
      ) : (
        <p className="mb-8 text-justify">
          No dudo en recomendar a <strong>{blank(d.recomendado)}</strong> y
          estoy seguro/a de que superará las expectativas en cualquier desafío
          que se le presente. Si requiere más información no dude en
          contactarme.
        </p>
      )}

      <p className="mb-10">Atentamente,</p>

      {/* Firma */}
      <div>
        <div className="border-b border-gray-500 w-44 mb-1" />
        <p className="font-bold text-sm">{blank(d.recomendante)}</p>
        {d.cargo_actual && (
          <p className="text-xs text-gray-600">{d.cargo_actual}</p>
        )}
        {d.correo_rec && (
          <p className="text-xs text-gray-500 mt-1">{d.correo_rec}</p>
        )}
        {d.telefono_rec && (
          <p className="text-xs text-gray-500">{d.telefono_rec}</p>
        )}
      </div>
    </div>
  );
}