"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { DynamicIcon } from "@/components/ui/DynamicIcon";

interface HomeServicesProps {
  services?: any[];
}

export function HomeServices({ services = [] }: HomeServicesProps) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Our Services" 
          subtitle="We offer comprehensive waterproofing solutions for residential, commercial, and industrial properties."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group"
            >
              <div className="w-16 h-16 bg-blue-50 text-accent rounded-full flex items-center justify-center mb-6 group-hover:bg-accent group-hover:text-white transition-colors">
                <DynamicIcon name={service.icon} className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <Link href="/services" className="text-accent font-medium inline-flex items-center hover:text-orange-600 transition-colors">
                Learn more <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/services">
            <button className="bg-primary text-white px-8 py-3 rounded-full font-medium hover:bg-opacity-90 transition-all">
              View All 15 Services
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
