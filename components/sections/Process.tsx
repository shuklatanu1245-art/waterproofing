"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

import Image from "next/image";

export function Process({ steps }: { steps: any[] }) {
  // If no steps provided from DB, fallback to default steps
  const displaySteps = steps?.length > 0 ? steps : [
    { id: 1, title: "Site Inspection", description: "Free assessment of your property." },
    { id: 2, title: "Leakage Analysis", description: "Identifying the root cause of the issue." },
    { id: 3, title: "Customized Solution", description: "Tailored plan for your specific needs." },
    { id: 4, title: "Material Selection", description: "Choosing the best premium materials." },
    { id: 5, title: "Waterproofing Application", description: "Professional execution by experts." },
    { id: 6, title: "Final Quality Check", description: "Ensuring 100% leak-proof results." },
  ];
  return (
    <section className="py-20 bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Our Process" 
          subtitle="A systematic approach to guarantee perfect waterproofing for your property."
          centered
        />
        
        <div className="mt-16 relative">
          {/* Horizontal Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-6 gap-8 relative z-10">
            {displaySteps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                {step.image_url ? (
                  <div className="w-full aspect-square rounded-2xl bg-white border-4 border-gray-100 shadow-xl mb-6 relative overflow-hidden group">
                    <Image src={step.image_url} alt={step.title} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold shadow-md z-10">
                      {index + 1}
                    </div>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-accent text-primary text-2xl font-bold flex items-center justify-center shadow-lg mb-4 relative">
                    {index + 1}
                    {/* Connecting line for mobile */}
                    {index !== displaySteps.length - 1 && (
                      <div className="md:hidden absolute top-full left-1/2 w-1 h-12 bg-gray-200 -translate-x-1/2 -z-10"></div>
                    )}
                  </div>
                )}
                <h4 className="text-lg font-bold text-primary mb-2">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
