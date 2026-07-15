"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";

// Sample placeholder images for masonry gallery
const galleryImages = [
  "https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1621293954908-907159247fc8?q=80&w=800&auto=format&fit=crop",
];

export default function GalleryPage() {
  return (
    <div className="pt-20 bg-background min-h-screen">
      <div className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
          Visual proof of our high-quality waterproofing work.
        </p>
      </div>

      {/* Before & After Videos */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Before & After Videos" 
            subtitle="See the real difference our treatments make."
            centered
          />
          
          <div className="mt-12 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 aspect-video flex items-center justify-center border-4 border-gray-200"
            >
              <div className="text-gray-400 text-center p-4">
                <span className="block font-bold text-xl mb-2">Before</span>
                <span className="text-sm">[Before Video Placeholder]</span>
              </div>
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                BEFORE
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 aspect-video flex items-center justify-center border-4 border-accent"
            >
              <div className="text-gray-400 text-center p-4">
                <span className="block font-bold text-xl mb-2">After</span>
                <span className="text-sm">[After Video Placeholder]</span>
              </div>
              <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                AFTER
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Project Photos" 
            subtitle="Glimpses of our ongoing and completed projects."
            centered
          />
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((src, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (index % 3) * 0.1 }}
                className="relative h-64 rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url('${src}')` }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 font-medium transition-opacity duration-300">
                    View Image
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
