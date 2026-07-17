"use client";

import { useState } from "react";
import { submitFeedback } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

export function FeedbackForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    };

    const res = await submitFeedback(data);
    
    setIsSubmitting(false);
    if (res.success) {
      setIsSuccess(true);
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  if (isSuccess) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-green-50 p-8 rounded-2xl text-center border border-green-200"
      >
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600">Your feedback has been successfully submitted and will be reviewed by our team.</p>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10" />
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Leave Your Feedback</h3>
      <p className="text-gray-600 mb-8">Are you a past customer? We would love to hear about your experience with AquaProtect.</p>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="feedback-name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input 
              id="feedback-name"
              name="name"
              type="text" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label htmlFor="feedback-phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input 
              id="feedback-phone"
              name="phone"
              type="tel" 
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
              placeholder="+91 98765 43210"
            />
          </div>
        </div>
        <div>
          <label htmlFor="feedback-message" className="block text-sm font-medium text-gray-700 mb-2">Your Experience</label>
          <textarea 
            id="feedback-message"
            name="message"
            required
            rows={4}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors resize-none"
            placeholder="Tell us about the service you received..."
          ></textarea>
        </div>
        
        <Button 
          type="submit" 
          variant="primary" 
          className="w-full flex items-center justify-center py-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">Processing...</span>
          ) : (
            <span className="flex items-center">
              Submit Feedback <Send className="ml-2 w-4 h-4" />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}
