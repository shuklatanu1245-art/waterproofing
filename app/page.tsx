import { Hero } from "@/components/sections/Hero";
import { HomeAbout } from "@/components/sections/HomeAbout";
import { HomeServices } from "@/components/sections/HomeServices";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Process } from "@/components/sections/Process";
import { BeforeAfterGallery } from "@/components/sections/BeforeAfterGallery";
import { TestimonialCarousel } from "@/components/sections/TestimonialCarousel";
import { LeadGenForm } from "@/components/forms/LeadGenForm";
import { getServices, getBeforeAfterVideos } from "@/lib/actions";

export const dynamic = "force-dynamic";

export default async function Home() {
  const allServices = await getServices();
  const topServices = allServices.slice(0, 6);
  const videos = await getBeforeAfterVideos();

  return (
    <>
      <Hero />
      <HomeAbout />
      <HomeServices services={topServices} />
      <WhyChooseUs />
      <Process />
      <BeforeAfterGallery videos={videos} />
      <TestimonialCarousel />
      <LeadGenForm />
    </>
  );
}
