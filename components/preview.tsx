"use client";

import { Download, Share2, Maximize2 } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "./ui/aspect-ratio";

type PreviewProps = {
  url: string;
  priority?: boolean;
  onOpenLightbox?: () => void;
};

export function Preview({ url, priority, onOpenLightbox }: PreviewProps) {
  if (!url || url.trim().length === 0) {
    return null;
  }

  const handleDownload = async (e: React.MouseEvent) => {
    e.preventDefault();
    const response = await fetch(url);
    const blob = await response.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `TaTTTy-${Math.random().toString(36).substring(7)}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Image Share",
          url: url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("URL copied to clipboard!");
    }
  };

  return (
    <div className="group relative rounded-xl overflow-hidden shadow-md transition-all hover:shadow-xl cursor-pointer">
      <AspectRatio ratio={1 / 1}>
        <Image
          alt={url}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          src={url}
          onClick={onOpenLightbox}
        />
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none sm:pointer-events-auto">
          <button
            onClick={handleDownload}
            className="rounded-full bg-white p-2 text-black hover:bg-gray-200 transition-colors"
            title="Download"
          >
            <Download className="size-4" />
          </button>
          <button
            onClick={handleShare}
            className="rounded-full bg-white p-2 text-black hover:bg-gray-200 transition-colors"
            title="Share"
          >
            <Share2 className="size-4" />
          </button>
          <button
            onClick={onOpenLightbox}
            className="rounded-full bg-white p-2 text-black hover:bg-gray-200 transition-colors"
            title="Lightbox"
          >
            <Maximize2 className="size-4" />
          </button>
        </div>
      </AspectRatio>
    </div>
  );
}
