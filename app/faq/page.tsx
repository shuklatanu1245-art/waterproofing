"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const faqs = [
  {
    question: "How long does waterproofing last?",
    answer: "Our professional waterproofing treatments can last anywhere from 5 to 15 years depending on the type of application, the materials used, and the exposure to weather conditions. We use premium chemicals that offer maximum durability."
  },
  {
    question: "Is waterproofing suitable for old buildings?",
    answer: "Absolutely. Waterproofing is crucial for older buildings to protect their structural integrity. We have specialized treatments and injection grouting techniques specifically designed to treat old walls and foundations without causing structural damage."
  },
  {
    question: "Do you provide a warranty?",
    answer: "Yes, we provide a workmanship warranty on all our major waterproofing projects. The warranty period varies depending on the specific service and materials selected, usually ranging from 3 to 10 years."
  },
  {
    question: "How much does waterproofing cost?",
    answer: "The cost depends on the total area, the severity of the damage, and the specific materials required. We offer a free site inspection where our experts will assess the problem and provide a detailed, no-obligation quote."
  },
  {
    question: "How long does the work take?",
    answer: "Most residential projects like bathroom or terrace waterproofing can be completed in 2 to 4 days. Larger commercial or industrial projects will take longer. We always provide a clear timeline before starting any work."
  },
  {
    question: "Is the site inspection free?",
    answer: "Yes, our initial site inspection is completely free of charge. Our expert will visit your property, identify the source of the leakage, and recommend the best possible solution."
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-20 bg-background min-h-screen">
      <div className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
          Find answers to common questions about our waterproofing services.
        </p>
      </div>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                >
                  <span className="font-bold text-primary text-lg pr-4">{faq.question}</span>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${openIndex === index ? 'bg-accent text-white' : 'bg-gray-100 text-gray-500'}`}>
                    {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                  </div>
                </button>
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-50 mt-2">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 bg-white p-8 rounded-2xl text-center shadow-md border border-gray-100">
            <h3 className="text-2xl font-bold text-primary mb-4">Still have questions?</h3>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              If you couldn&apos;t find the answer to your question, our team is always ready to help. Get in touch with us directly.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <Button variant="accent">Contact Support</Button>
              </Link>
              <a href="tel:+1234567890">
                <Button variant="outline">Call Us Now</Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
