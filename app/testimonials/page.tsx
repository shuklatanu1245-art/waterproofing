"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

import { getTestimonials } from "@/lib/actions";
import { FeedbackForm } from "@/components/sections/FeedbackForm";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const allTestimonials = await getTestimonials();
  return (
    <div className="pt-20 bg-background min-h-screen">
      <div className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Client Testimonials</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
          Read what our satisfied customers have to say about our waterproofing services.
        </p>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allTestimonials.map((testimonial, index) => (
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
          </div>
        </div>
      </section>

      {/* Feedback Form Section */}
      <section className="py-20 bg-gray-50 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeedbackForm />
        </div>
      </section>
    </div>
  );
}
