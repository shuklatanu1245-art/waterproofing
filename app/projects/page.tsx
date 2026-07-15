"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, CheckCircle } from "lucide-react";

const allProjects = [
  {
    id: 1,
    name: "ABC Apartment Complex",
    location: "Downtown City",
    service: "Terrace Waterproofing",
    date: "March 2023",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "XYZ International School",
    location: "North West Region",
    service: "Roof Waterproofing",
    date: "June 2023",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Green Residency",
    location: "East Side",
    service: "Basement Waterproofing",
    date: "August 2023",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "TechHub IT Park",
    location: "Cyber City",
    service: "Exterior Wall Waterproofing",
    date: "November 2023",
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 5,
    name: "Royal Enclave Villas",
    location: "South Hills",
    service: "Swimming Pool Waterproofing",
    date: "January 2024",
    category: "Residential",
    image: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 6,
    name: "MegaCorp Factory",
    location: "Industrial Area",
    service: "Industrial Waterproofing",
    date: "February 2024",
    category: "Industrial",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2000&auto=format&fit=crop",
  },
];

const categories = ["All", "Residential", "Commercial", "Industrial"];

export default function ProjectsPage() {
  const [filter, setFilter] = useState("All");

  const filteredProjects = filter === "All" 
    ? allProjects 
    : allProjects.filter(p => p.category === filter);

  return (
    <div className="pt-20 bg-background min-h-screen">
      <div className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
          Explore our successfully completed waterproofing projects across various sectors.
        </p>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  filter === cat 
                    ? "bg-accent text-white shadow-md" 
                    : "bg-white text-primary border border-gray-200 hover:bg-gray-50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-gray-100 group"
                >
                  <div className="relative h-60 overflow-hidden">
                    <div 
                      className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                      style={{ backgroundImage: `url('${project.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                      <span className="bg-accent px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">{project.name}</h3>
                    <div className="space-y-2 text-gray-600 text-sm">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-2 text-accent" />
                        {project.location}
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 text-accent" />
                        {project.service}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-accent" />
                        Completed: {project.date}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>
    </div>
  );
}
