import { Hero } from "@/components/sections/Hero";
import { HomeAbout } from "@/components/sections/HomeAbout";
import { HomeServices } from "@/components/sections/HomeServices";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Process } from "@/components/sections/Process";
import { BeforeAfterGallery } from "@/components/sections/BeforeAfterGallery";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { LeadGenForm } from "@/components/forms/LeadGenForm";
import { getServices, getBeforeAfterVideos, getTestimonials, getProcessSteps } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [allServices, videos, testimonials, processSteps] = await Promise.all([
    getServices(),
    getBeforeAfterVideos(),
    getTestimonials(),
    getProcessSteps()
  ]);

  return (
    <>
      <Hero />
      <HomeAbout />
      <HomeServices services={allServices} />
      <WhyChooseUs />
      <Process steps={processSteps} />
      <BeforeAfterGallery videos={videos} />
      <TestimonialCarousel testimonials={testimonials} />
      <LeadGenForm />
    </>
  );
}
