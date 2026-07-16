"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckCircle2, Shield, Target, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Banner */}
      <div className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
          Learn more about our mission, vision, and the team behind AquaProtect.
        </p>
      </div>

      {/* Introduction */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-primary mb-2">Our Story</h2>
              <div className="w-12 h-1 bg-accent mb-6"></div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                We specialize in high-quality waterproofing solutions that protect buildings from leakage, seepage, and moisture damage. Our experienced team uses premium materials and modern techniques to deliver durable and long-lasting results.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                With years of experience in the industry, we have successfully completed hundreds of residential and commercial projects. Our commitment to quality and customer satisfaction has made us a trusted name in the waterproofing industry.
              </p>
              <ul className="space-y-3">
                {["Certified Experts", "Premium Chemicals", "Modern Equipment", "Guaranteed Results"].map((item, i) => (
                  <li key={i} className="flex items-center text-primary font-medium">
                    <CheckCircle2 className="w-5 h-5 text-accent mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative h-[450px] rounded-2xl overflow-hidden shadow-xl"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1541888086425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop')" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Years Experience", value: "5+" },
              { label: "Projects Completed", value: "1200+" },
              { label: "Cities Covered", value: "5" },
              { label: "Happy Clients", value: "98%" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
              >
                <div className="text-4xl font-bold text-accent mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-background p-10 rounded-2xl border-t-4 border-accent"
            >
              <Target className="w-12 h-12 text-accent mb-6" />
              <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide top-tier waterproofing services that permanently solve leakage issues, ensuring the structural integrity of buildings and peace of mind for our customers.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-background p-10 rounded-2xl border-t-4 border-primary"
            >
              <Shield className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the most trusted and preferred waterproofing company in the region, known for our technological advancements, unmatched quality, and customer-first approach.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Meet Our Experts" centered />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-white rounded-xl overflow-hidden shadow-sm"
              >
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <Users className="w-16 h-16 text-gray-400" />
                </div>
                <div className="p-6 text-center">
                  <h4 className="text-lg font-bold text-primary">Team Member {i}</h4>
                  <p className="text-accent mb-2">Waterproofing Specialist</p>
                  <p className="text-sm text-gray-500">10+ years of experience in structural waterproofing and crack repair.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
