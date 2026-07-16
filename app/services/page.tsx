import { getServices } from "@/lib/actions";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const allServices = await getServices();
  return (
    <div className="pt-20 bg-background min-h-screen">
      <div className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
          Comprehensive waterproofing solutions tailored for every part of your building.
        </p>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allServices.map((service: any) => (
              <div
                key={service.id}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group flex flex-col"
              >
                <div className="w-16 h-16 bg-blue-50 text-accent rounded-full flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                  <DynamicIcon name={service.icon} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-8 flex-grow">{service.description}</p>
                <Link href="/contact" className="mt-auto">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                    Get Quote
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-accent text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Not sure which service you need?</h2>
          <p className="text-lg mb-8 opacity-90">Book a free site inspection. Our experts will identify the problem and recommend the perfect solution.</p>
          <Link href="/contact">
            <Button variant="primary" size="lg" className="bg-primary hover:bg-[#081b33] text-white">
              Request Free Inspection
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
