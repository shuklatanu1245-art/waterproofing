"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2 } from "lucide-react";

const reasons = [
  "Experienced Professionals",
  "High-Quality Waterproofing Materials",
  "Advanced Application Techniques",
  "Free Site Inspection",
  "Affordable Pricing",
  "Timely Project Completion",
  "Residential & Commercial Services",
  "Workmanship Warranty",
];

export function WhyChooseUs() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Why Choose Us" 
          subtitle="We are committed to delivering the best waterproofing solutions with a focus on quality, durability, and customer satisfaction."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start p-4 rounded-lg bg-gray-50 border border-gray-100 hover:border-accent transition-colors"
            >
              <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0 mr-3" />
              <span className="text-primary font-medium">{reason}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
