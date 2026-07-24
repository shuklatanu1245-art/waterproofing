import { Hero } from "@/components/sections/Hero";
import { HomeAbout } from "@/components/sections/HomeAbout";
import { HomeServices } from "@/components/sections/HomeServices";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Process } from "@/components/sections/Process";
import { BeforeAfterGallery } from "@/components/sections/BeforeAfterGallery";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { LeadGenForm } from "@/components/forms/LeadGenForm";
import { getServices, getBeforeAfterVideos, getTestimonials, getProcessSteps } from "@/lib/actions";

export const revalidate = 10;

export default async function Home() {
  const allServices = await getServices();
  const videos = await getBeforeAfterVideos();
  const testimonials = await getTestimonials();
  const processSteps = await getProcessSteps();

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
