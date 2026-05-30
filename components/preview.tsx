"use client";

import Image from "next/image";

type PreviewProps = {
  url?: string;
  priority?: boolean;
};

export const Preview = ({ url, priority }: PreviewProps) => {
  if (!url || typeof url !== "string" || url.trim() === "") return null;

  return (
    <div className="mb-4 break-inside-avoid rounded-xl bg-card p-2 shadow-xl">
      <Image
        alt="Gallery image"
        className="rounded-md"
        height={630}
        priority={priority}
        sizes="630px"
        src={url}
        width={630}
      />
    </div>
  );
};
