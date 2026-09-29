import Link from "next/link";
import { HOME_SERVICES } from "@/lib/constants";

export default function ServiceCards() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-3 lg:px-8">
        {HOME_SERVICES.map((service) => (
          <div
            key={service.title}
            className="flex flex-col justify-between rounded-2xl border border-gold-light/40 bg-navy p-8 text-white shadow-lg"
          >
            <div>
              <h3 className="text-xl font-bold text-gold">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                {service.description}
              </p>
            </div>
            <Link
              href={service.href}
              className="mt-6 inline-block w-fit rounded-full bg-gold px-5 py-2 text-sm font-bold text-navy transition hover:bg-gold-light"
            >
              اعرَف المزيد
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
