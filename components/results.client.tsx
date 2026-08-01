"use client";

import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { Preview } from "./preview";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "./ui/empty";
import type { ImageItem } from "./results";
import { useState } from "react";

type Props = {
  initialData: ImageItem[];
};

const PRIORITY_COUNT = 12;

export function ResultsClient({ initialData }: Props) {
  const [lightboxImageIndex, setLightboxImageIndex] = useState<number | null>(null);
  const hasImages = initialData.length > 0;

  if (!hasImages) {
    return (
      <Empty className="h-full min-h-[50vh] rounded-lg border">
        <EmptyHeader className="max-w-none">
          <div className="relative isolate mb-8 flex">
            <div className="rounded-full border bg-background p-3 shadow-xs">
              <ImageIcon className="size-5 text-muted-foreground" />
            </div>
          </div>
          <EmptyTitle>No images found</EmptyTitle>
          <EmptyDescription>
            Your generated images will show up here.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  const closeLightbox = () => setLightboxImageIndex(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {initialData.map((item, index) => (
          <Preview
            key={item.id}
            priority={index < PRIORITY_COUNT}
            url={item.url}
            onOpenLightbox={() => setLightboxImageIndex(index)}
          />
        ))}
      </div>

      {lightboxImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 z-50 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
            onClick={closeLightbox}
          >
            <X className="size-6" />
          </button>

          <div
            className="relative h-full w-full max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              alt={`Image ${lightboxImageIndex + 1}`}
              src={initialData[lightboxImageIndex].url}
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}
