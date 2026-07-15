"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ShieldCheck, Droplet, Clock } from "lucide-react";

export function HomeAbout() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=2072&auto=format&fit=crop')" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold text-primary mb-2">About AquaProtect</h2>
            <div className="w-12 h-1 bg-accent mb-6"></div>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              We specialize in high-quality waterproofing solutions that protect buildings from leakage, seepage, and moisture damage. Our experienced team uses premium materials and modern techniques to deliver durable and long-lasting results.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-primary">100% Guaranteed Work</h4>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Droplet className="w-5 h-5 text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-primary">Premium Materials</h4>
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-primary">Timely Execution</h4>
                </div>
              </div>
            </div>

            <Link href="/about">
              <Button variant="outline">
                Read More About Us
              </Button>
            </Link>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
