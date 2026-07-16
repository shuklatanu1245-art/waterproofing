import { SectionHeading } from "@/components/ui/SectionHeading";
import { getBeforeAfterVideos, getGalleryPhotos } from "@/lib/actions";
import { BeforeAfterGallery } from "@/components/sections/BeforeAfterGallery";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const videos = await getBeforeAfterVideos();
  const photos = await getGalleryPhotos();

  return (
    <div className="pt-20 bg-background min-h-screen">
      <div className="bg-primary text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto px-4">
          Visual proof of our high-quality waterproofing work.
        </p>
      </div>

      <BeforeAfterGallery videos={videos} />

      {/* Image Gallery */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Project Photos" 
            subtitle="Glimpses of our ongoing and completed projects."
            centered
          />
          
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(photos as any[]).map((photo) => (
              <div
                key={photo.id}
                className="relative h-64 rounded-xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-xl"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-500"
                  style={{ backgroundImage: `url('${photo.image_url}')` }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 font-medium transition-opacity duration-300 text-center px-4">
                    {photo.title || "View Image"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
