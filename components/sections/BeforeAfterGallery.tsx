"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function BeforeAfterGallery() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="See The Difference" 
          subtitle="Real results from our professional waterproofing treatments."
          centered
        />
        
        <div className="mt-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 aspect-video flex items-center justify-center border-4 border-gray-200"
            >
              {/* Replace this div with a <video> tag when you have the specific video */}
              <div className="text-gray-400 text-center p-4">
                <span className="block font-bold text-xl mb-2">Before</span>
                <span className="text-sm">[Before Video Placeholder]</span>
              </div>
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                BEFORE
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 aspect-video flex items-center justify-center border-4 border-accent"
            >
              {/* Replace this div with a <video> tag when you have the specific video */}
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
        
        <div className="text-center mt-12">
          <Link href="/gallery">
            <Button variant="outline">View Full Gallery</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
