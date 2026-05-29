"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK_URL = "https://tattty-uploads.tattty.com/TATTTYLOGO.png";

type PreviewProps = {
  url: string;
  priority?: boolean;
};

export const Preview = ({ url, priority }: PreviewProps) => {
  const [src, setSrc] = useState(url || FALLBACK_URL);

  return (
    <div className="mb-4 rounded-xl bg-card p-2 shadow-xl">
      <Image
        alt="Gallery image"
        className="rounded-md"
        height={630}
        priority={priority}
        sizes="630px"
        src={src}
        width={630}
        onError={() => setSrc(FALLBACK_URL)}
      />
    </div>
  );
};
