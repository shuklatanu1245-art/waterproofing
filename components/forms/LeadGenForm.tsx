"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";
import { submitLead } from "@/lib/actions";

type FormData = {
  name: string;
  phone: string;
  email: string;
  propertyType: string;
  problemType: string;
  visitDate: string;
  photos: FileList;
};

export function LeadGenForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const res = await submitLead(data);
    setIsSubmitting(false);
    if (res.success) {
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Request a Free Site Inspection</h2>
            <div className="w-12 h-1 bg-accent mb-6"></div>
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              Don&apos;t wait for the damage to spread. Book a free inspection today and get expert advice from our waterproofing specialists.
            </p>
            <ul className="space-y-4">
              <li className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center mr-3 text-sm font-bold">1</span>
                <span>Fill out the inspection request form</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center mr-3 text-sm font-bold">2</span>
                <span>Our team schedules a convenient visit</span>
              </li>
              <li className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-accent flex items-center justify-center mr-3 text-sm font-bold">3</span>
                <span>Get a detailed leakage report and quote</span>
              </li>
            </ul>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-2xl shadow-xl"
          >
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">✓</div>
                <h3 className="text-2xl font-bold text-primary mb-2">Request Submitted!</h3>
                <p className="text-gray-600">Thank you for reaching out. Our team will contact you shortly to confirm the inspection time.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    {...register("name", { required: "Name is required" })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
                    placeholder="John Doe"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <input 
                      type="tel"
                      {...register("phone", { required: "Phone is required" })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
                      placeholder="+91 98765 43210"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input 
                      type="email"
                      {...register("email")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                    <select 
                      {...register("propertyType")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors bg-white"
                    >
                      <option value="Home">Home / Apartment</option>
                      <option value="Office">Office / Commercial</option>
                      <option value="Industrial">Industrial</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Problem Type</label>
                    <select 
                      {...register("problemType")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors bg-white"
                    >
                      <option value="Leakage">Roof/Terrace Leakage</option>
                      <option value="Dampness">Wall Dampness</option>
                      <option value="Cracks">Cracks</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Visit Date</label>
                    <input 
                      type="date"
                      {...register("visitDate")}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Photos (Optional)</label>
                    <input 
                      type="file"
                      multiple
                      {...register("photos")}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-accent focus:border-accent outline-none transition-colors bg-white"
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  variant="accent" 
                  className="w-full h-12 text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Request Free Inspection"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
