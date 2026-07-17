import { getTestimonials } from "@/lib/actions";
import { FeedbackForm } from "@/components/sections/FeedbackForm";
import { TestimonialsList } from "@/components/sections/TestimonialsList";

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
          <TestimonialsList testimonials={allTestimonials} />
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
