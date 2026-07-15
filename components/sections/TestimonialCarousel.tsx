"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Homeowner",
    text: "We had severe leakage in our terrace for years. AquaProtect fixed it completely within 3 days. It's been raining heavily and there is zero dampness. Highly recommended!",
  },
  {
    id: 2,
    name: "Anita Sharma",
    role: "Apartment Secretary",
    text: "Very professional team. They inspected our entire building and provided a very cost-effective waterproofing solution for the exterior walls. The quality of work is excellent.",
  },
  {
    id: 3,
    name: "Vikram Singh",
    role: "Business Owner",
    text: "I hired them for basement waterproofing of my warehouse. They used high-grade chemicals and the problem is permanently solved. Great service and timely execution.",
  },
];

export function TestimonialCarousel() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="What Our Clients Say" 
          subtitle="Don't just take our word for it. Here is what our satisfied customers have to say."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-gray-100" />
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-accent fill-accent" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic relative z-10">&quot;{testimonial.text}&quot;</p>
              <div>
                <h4 className="font-bold text-primary">{testimonial.name}</h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
