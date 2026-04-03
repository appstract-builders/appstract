import HomeDevelop from "../components/home/home-develop";
import ProductExperience from "../components/products/product-experience";
import ProductTestimonial from "../components/products/product-testimonial";
import SiteFooter from "../components/site-footer";

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-[#020611] text-white">
      <section className="relative overflow-hidden border-b border-white/8 px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(128,82,221,0.16),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(103,232,249,0.08),transparent_30%)]" />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="max-w-4xl">
            <p className="text-[0.7rem] uppercase tracking-[0.45em] text-[#8052DD]/72">
              Products
            </p>
            <h1 className="mt-4 text-4xl font-light tracking-[0.08em] text-white sm:text-6xl">
              Paquetes pensados para distintas etapas del producto.
            </h1>
            <p className="mt-6 max-w-3xl text-sm leading-7 tracking-[0.04em] text-white/70 sm:text-base">
              Esta ruta concentra los tiers de Appending y algunos prototipos de
              referencia para visualizar el tipo de experiencia digital que
              entregamos.
            </p>
          </div>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col items-center">
        <HomeDevelop />
        <ProductExperience />
        <ProductTestimonial />
      </div>

      <SiteFooter />
    </main>
  );
}
