function fmtDate(dateStr) {
  if (!dateStr) return "_______________";
  const d = new Date(dateStr + "T12:00:00");
  return d.toLocaleDateString("es-SV", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function blank(val, fallback = "_______________") {
  return val && String(val).trim() ? val : fallback;
}

function calcDias(inicio, fin) {
  if (!inicio || !fin) return "___";
  const s = new Date(inicio),
    e = new Date(fin);
  return Math.max(1, Math.ceil((e - s) / 86400000) + 1);
}

const paper =
  "bg-white rounded-xl shadow-lg font-[Calibri,Georgia,serif] text-[13px] leading-relaxed text-gray-800 min-h-[700px]";

// ─────────────────────────────────────────────────────────────────────
// 1. CONSTANCIA DE TRABAJO — basada en imagen 1
// ─────────────────────────────────────────────────────────────────────
function ConstanciaTrabajo({ d }) {
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

// ─────────────────────────────────────────────────────────────────────
// 2. PERMISO LABORAL — basada en imagen 2
// ─────────────────────────────────────────────────────────────────────
function PermisoLaboral({ d }) {
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

// ─────────────────────────────────────────────────────────────────────
// 3. SOLICITUD DE VACACIONES — basada en imagen 3
// ─────────────────────────────────────────────────────────────────────
function SolicitudVacaciones({ d }) {
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
        Reciba un cordial saludo. Por medio de la presente, solicito de la manera más atenta su
        autorización para tomar un período vacacional del{" "}
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

// ─────────────────────────────────────────────────────────────────────
// 4. PREAVISO LABORAL — formato oficial gobierno El Salvador (imagen 4)
//    Sin las instrucciones en paréntesis (solo datos reales)
// ─────────────────────────────────────────────────────────────────────
function PreavisoLaboral({ d }) {
  const cell = "border border-gray-500 p-3";
  return (
    <div id="document-preview" className={`${paper} p-4`}>
      <div className="border-2 border-gray-500 text-[13px]">
        {/* Título */}
        <div className={`${cell} text-center border-b-2`}>
          <h1 className="text-lg font-bold uppercase tracking-widest">
            PREAVISO LABORAL
          </h1>
        </div>

        {/* Fila vacía */}
        <div className={`${cell} h-8`} />

        {/* Empresa */}
        <div className={`${cell} text-center`}>
          <p className="font-semibold min-h-[20px]">{blank(d.empresa, "")}</p>
        </div>

        {/* Presente */}
        <div className={cell}>
          <p className="font-bold">Presente.</p>
        </div>

        {/* Texto legal */}
        <div className={cell}>
          <p className="text-justify">
            Por este medio interpongo mi preaviso de la Renuncia Voluntaria para
            dar cumplimiento al{" "}
            <strong>
              Art.2 de la ley Reguladora de Prestación Económica por Renuncia
              Voluntaria
            </strong>
            , según Decreto <strong>Legislativo 592</strong>, la cual surtirá
            efecto a partir del día:
          </p>
        </div>

        {/* Fecha último día */}
        <div className={cell}>
          <div className="border-b border-gray-600 w-64 mx-auto text-center pb-0.5 min-h-[22px]">
            {fmtDate(d.fecha_ultimo_dia)}
          </div>
        </div>

        {/* Agradecimiento */}
        <div className={cell}>
          <p className="font-bold">
            Agradezco la oportunidad que se me otorgó por prestar mis servicios
            a dicha empresa desde:
          </p>
        </div>

        {/* Fecha ingreso */}
        <div className={cell}>
          <div className="border-b border-gray-600 w-56 pb-0.5 min-h-[22px]">
            {fmtDate(d.fecha_ingreso)}
          </div>
        </div>

        {/* Ciudad y fecha presentación */}
        <div className={`${cell} flex items-end gap-2`}>
          <span className="shrink-0 font-semibold">San Salvador,</span>
          <div className="flex-1 border-b border-gray-600 pb-0.5 min-h-[22px]">
            {fmtDate(d.fecha_presentacion)}
          </div>
        </div>

        {/* Nombre del trabajador */}
        <div className={cell}>
          <div className="border-b border-gray-600 w-72 mx-auto text-center pb-0.5 min-h-[22px] font-semibold">
            {blank(d.empleado, "")}
          </div>
        </div>

        {/* DUI */}
        <div className={cell}>
          <div className="border-b border-gray-600 w-52 mx-auto text-center pb-0.5 min-h-[22px]">
            {blank(d.dui, "")}
          </div>
        </div>

        {/* Firma del trabajador */}
        <div className={cell}>
          <p className="font-bold mb-8">F.</p>
          <div className="border-b border-gray-600 w-48" />
        </div>

        {/* Título firma empleador */}
        <div className={`${cell} border-t-2`}>
          <p className="font-bold text-xs">
            FIRMA DE RECIBIDO DEL EMPLEADOR DIA Y HORA
          </p>
          <p className="font-bold text-xs">
            DE LA PRESENTACION. ART.4 DECRETO LEG. 592
          </p>
        </div>

        {/* Firma empleador */}
        <div className={cell}>
          <p className="font-bold mb-8">F.</p>
          <div className="border-b border-gray-600 w-48" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// 5. CARTA DE RECOMENDACIÓN — basada en imagen 5
// ─────────────────────────────────────────────────────────────────────
function CartaRecomendacion({ d }) {
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

// ─────────────────────────────────────────────────────────────────────
// 6. CONSTANCIA DE ESTUDIOS — basada en imagen 6, estilo imagen 1
// ─────────────────────────────────────────────────────────────────────
function ConstanciaEstudios({ d }) {
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

// ─────────────────────────────────────────────────────────────────────
// 7. SOLICITUD DE BECA — basada en imagen 7
// ─────────────────────────────────────────────────────────────────────
function SolicitudBeca({ d }) {
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
