"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

import ReactPlayer from "react-player";

interface BeforeAfterGalleryProps {
  videos?: any[];
}

export function BeforeAfterGallery({ videos = [] }: BeforeAfterGalleryProps) {
  // If no videos are passed, we show a default placeholder
  const displayVideos = videos.length > 0 ? videos : [
    {
      id: 0,
      title: "Placeholder Project",
      description: "Sample before and after demonstration.",
      before_video_url: "",
      after_video_url: ""
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="See The Difference" 
          subtitle="Real results from our professional waterproofing treatments."
          centered
        />
        
        <div className="mt-12 max-w-4xl mx-auto space-y-16">
          {displayVideos.map((video) => (
            <div key={video.id} className="space-y-6">
              {video.title !== "Placeholder Project" && (
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-primary">{video.title}</h3>
                  {video.description && <p className="text-gray-600 mt-2">{video.description}</p>}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 aspect-video flex items-center justify-center border-4 border-gray-200"
            >
              {video.before_video_url ? (
                // @ts-expect-error - ReactPlayer props are sometimes not fully typed
                <ReactPlayer url={video.before_video_url} width="100%" height="100%" playing loop muted playsinline className="absolute top-0 left-0" />
              ) : (
                <div className="text-gray-400 text-center p-4">
                  <span className="block font-bold text-xl mb-2">Before</span>
                  <span className="text-sm">[Before Video Placeholder]</span>
                </div>
              )}
              <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-md">
                BEFORE
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative rounded-2xl overflow-hidden shadow-lg bg-gray-100 aspect-video flex items-center justify-center border-4 border-accent"
            >
              {video.after_video_url ? (
                // @ts-expect-error - ReactPlayer props are sometimes not fully typed
                <ReactPlayer url={video.after_video_url} width="100%" height="100%" playing loop muted playsinline className="absolute top-0 left-0" />
              ) : (
                <div className="text-gray-400 text-center p-4">
                  <span className="block font-bold text-xl mb-2">After</span>
                  <span className="text-sm">[After Video Placeholder]</span>
                </div>
              )}
              <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-bold shadow-md z-10">
                AFTER
              </div>
            </motion.div>
          </div>
        </div>
      ))}
    </div>
        
        <div className="text-center mt-12">
          <Link href="/gallery">
            <Button variant="outline">View Full Gallery</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
