"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export function TestimonialsList({ testimonials }: { testimonials: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
          className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 relative"
        >
          <Quote className="absolute top-6 right-6 w-10 h-10 text-gray-100" />
          <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-accent fill-accent" />
            ))}
          </div>
          <p className="text-gray-600 mb-6 italic relative z-10 leading-relaxed">
            &quot;{testimonial.text}&quot;
          </p>
          <div className="border-t border-gray-100 pt-4">
            <h4 className="font-bold text-primary">{testimonial.name}</h4>
            <p className="text-sm text-gray-500">{testimonial.role}</p>
          </div>
        </motion.div>
      ))}
      {testimonials.length === 0 && (
        <div className="col-span-full text-center text-gray-500">
          No testimonials yet.
        </div>
      )}
    </div>
  );
}
