const titles: Record<string, { title: string; subtitle: string }> = {
  "": {
    title: "Resumen",
    subtitle: "Vista general del panel interno. Aqui conectaras metricas y alertas.",
  },
  usuarios: {
    title: "Usuarios",
    subtitle: "Listado y roles. Esta pantalla es un esqueleto listo para tu backlog.",
  },
  "datos/usuario": {
    title: "Datos: usuario",
    subtitle: "Modelo local en SQLite via Drizzle. Sigue iterando el esquema cuando lo necesites.",
  },
  "datos/clase": {
    title: "Datos: clase",
    subtitle: "Placeholder de entidad clase para el panel.",
  },
  "datos/reserva": {
    title: "Datos: reserva",
    subtitle: "Placeholder de entidad reserva para el panel.",
  },
  "datos/pago": {
    title: "Datos: pago",
    subtitle: "Placeholder de entidad pago para el panel.",
  },
  analiticas: {
    title: "Analiticas",
    subtitle: "Graficos y embudos. Pendiente de integracion.",
  },
  dominios: {
    title: "Dominios",
    subtitle: "Administracion de dominios y DNS.",
  },
  integraciones: {
    title: "Integraciones",
    subtitle: "Conectores y claves API.",
  },
  seguridad: {
    title: "Seguridad",
    subtitle: "Politicas, accesos y auditoria.",
  },
  agentes: {
    title: "Agentes",
    subtitle: "Automatizaciones asistidas.",
  },
  automatizaciones: {
    title: "Automatizaciones",
    subtitle: "Reglas y disparadores.",
  },
  registros: {
    title: "Registros",
    subtitle: "Bitacora de eventos del sistema.",
  },
  api: {
    title: "API",
    subtitle: "Documentacion interna y tokens.",
  },
  "configuracion/plantilla": {
    title: "Configuracion: plantilla",
    subtitle: "Apariencia del panel y componentes base.",
  },
  "configuracion/autenticacion": {
    title: "Configuracion: autenticacion",
    subtitle: "Better Auth en local. Cambia a tu proveedor cuando toque.",
  },
  "configuracion/app": {
    title: "Configuracion: aplicacion",
    subtitle: "Variables generales y entornos.",
  },
};

type AdminCatchAllPageProps = {
  params: Promise<{
    segments?: string[];
  }>;
};

export default async function AdminCatchAllPage({ params }: AdminCatchAllPageProps) {
  const resolved = await params;
  const key = (resolved.segments ?? []).join("/");
  const entry = titles[key] ?? {
    title: "Seccion",
    subtitle: "Contenido pendiente. La navegacion ya esta tropicalizada.",
  };

  return (
    <section className="mx-auto w-full max-w-5xl space-y-4">
      <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,12,24,0.96),rgba(4,7,16,0.98))] px-5 py-8 shadow-[0_24px_90px_rgba(2,8,23,0.28)] sm:px-8 sm:py-10">
        <p className="text-[0.7rem] uppercase tracking-[0.42em] text-[#FF8904]/72">{entry.title}</p>
        <h1 className="mt-4 text-3xl font-light tracking-[0.08em] text-white sm:text-4xl">{entry.title}</h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 tracking-[0.04em] text-white/68 sm:text-base">
          {entry.subtitle}
        </p>
      </div>
    </section>
  );
}
