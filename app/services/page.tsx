"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { 
  Home, Grid, Bath, Archive, LayoutGrid, Droplets, 
  Building, Hammer, ArrowUpRight, Beaker, Syringe, 
  CloudRain, SplitSquareHorizontal, Waves, Factory
} from "lucide-react";

const allServices = [
  { id: 1, title: "Roof Waterproofing", icon: <Home className="w-8 h-8" />, desc: "Complete protection for all types of roofs against water seepage." },
  { id: 2, title: "Terrace Waterproofing", icon: <Grid className="w-8 h-8" />, desc: "Durable terrace treatments to prevent leakage into lower floors." },
  { id: 3, title: "Bathroom Waterproofing", icon: <Bath className="w-8 h-8" />, desc: "Advanced solutions for bathrooms to stop tile and wall dampness." },
  { id: 4, title: "Basement Waterproofing", icon: <Archive className="w-8 h-8" />, desc: "Protect your basement from groundwater and humidity." },
  { id: 5, title: "Balcony Waterproofing", icon: <LayoutGrid className="w-8 h-8" />, desc: "Seamless coatings to keep your balconies leak-free." },
  { id: 6, title: "Water Tank Waterproofing", icon: <Droplets className="w-8 h-8" />, desc: "Safe and hygienic waterproofing for underground and overhead tanks." },
  { id: 7, title: "Exterior Wall Waterproofing", icon: <Building className="w-8 h-8" />, desc: "Prevent rain water from seeping through exterior walls." },
  { id: 8, title: "Foundation Waterproofing", icon: <Hammer className="w-8 h-8" />, desc: "Strengthen your building's base by preventing water ingress." },
  { id: 9, title: "Crack Filling & Repair", icon: <ArrowUpRight className="w-8 h-8" />, desc: "Professional sealing of cracks to prevent future water ingress." },
  { id: 10, title: "Injection Grouting", icon: <Syringe className="w-8 h-8" />, desc: "High-pressure PU grouting to stop active water leaks instantly." },
  { id: 11, title: "Chemical Waterproofing", icon: <Beaker className="w-8 h-8" />, desc: "Advanced liquid applied membranes for tough surfaces." },
  { id: 12, title: "Damp Proofing", icon: <CloudRain className="w-8 h-8" />, desc: "Treatments to block rising dampness from the ground." },
  { id: 13, title: "Expansion Joint Treatment", icon: <SplitSquareHorizontal className="w-8 h-8" />, desc: "Flexible sealants for structural expansion joints." },
  { id: 14, title: "Swimming Pool Waterproofing", icon: <Waves className="w-8 h-8" />, desc: "Epoxy and cementitious coatings for pools and water bodies." },
  { id: 15, title: "Industrial Waterproofing", icon: <Factory className="w-8 h-8" />, desc: "Heavy-duty waterproofing for factories and warehouses." },
];

export default function ServicesPage() {
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
            {allServices.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all border border-gray-100 group flex flex-col"
              >
                <div className="w-16 h-16 bg-blue-50 text-accent rounded-full flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-8 flex-grow">{service.desc}</p>
                <Link href="/contact" className="mt-auto">
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                    Get Quote
                  </Button>
                </Link>
              </motion.div>
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
