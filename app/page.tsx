import { Hero } from "@/components/sections/Hero";
import { HomeAbout } from "@/components/sections/HomeAbout";
import { HomeServices } from "@/components/sections/HomeServices";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Process } from "@/components/sections/Process";
import { BeforeAfterGallery } from "@/components/sections/BeforeAfterGallery";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { LeadGenForm } from "@/components/forms/LeadGenForm";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeAbout />
      <HomeServices />
      <WhyChooseUs />
      <Process />
      <BeforeAfterGallery />
      <TestimonialCarousel />
      <LeadGenForm />
    </>
  );
}
