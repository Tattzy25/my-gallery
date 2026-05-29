/** biome-ignore-all lint/suspicious/noConsole: "Handy for debugging" */

import { Search } from "@upstash/search";
import type { PutBlobResult } from "@vercel/blob";
import { FatalError, getStepMetadata, RetryableError } from "workflow";

const upstash = Search.fromEnv();
const index = upstash.index("gallery");

export const indexImage = async (blob: PutBlobResult, text: string) => {
  "use step";

  const { attempt, stepStartedAt, stepId } = getStepMetadata();

  console.log(
    `[${stepId}] Indexing image (attempt ${attempt})...`,
    blob.downloadUrl
  );

  try {
    // 1. Upsert your cleaned structure 
    await index.upsert([ 
      { 
        id: "gallery", // as requested 
        content: { 
          "image_name": "", 
          "image_url": "", 
          "Title": "", 
          "Tags": "", 
          "Short Description": "", 
          "Dimensions": "", 
          "Image Alt Text": "", 
          "Mood": "", 
          "Style": "", 
          "Color Scheme": "" 
        }, 
        metadata: { 
          "Sku": "", 
          "Prompt": "", 
          "SEO Title": "", 
          "SEO Description": "", 
          "Body": "" 
        } 
      } 
    ]);

    console.log(
      `[${stepId}] Successfully indexed image at ${stepStartedAt.toISOString()}`
    );

  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";

    // Check for rate limiting
    if (
      message.includes("rate limit") ||
      message.includes("429") ||
      message.includes("quota")
    ) {
      throw new RetryableError(`Upstash rate limited: ${message}`, {
        retryAfter: "1m",
      });
    }

    // Check for network/connection errors
    if (
      message.includes("timeout") ||
      message.includes("network") ||
      message.includes("connection")
    ) {
      throw new RetryableError(`Upstash connection error: ${message}`);
    }

    throw new FatalError(`Failed to index image: ${message}`);
  }
};
