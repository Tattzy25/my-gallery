import { Search } from "@upstash/search";

const client = new Search({
  url: process.env.UPSTASH_SEARCH_REST_URL!,
  token: process.env.UPSTASH_SEARCH_REST_TOKEN!,
});

type GeneratedImage = {
  customerId: string;
  imageId: string;
  imageUrl: string;
  prompt?: string;
};

export const indexImage = async (image: GeneratedImage): Promise<void> => {
  // One isolated index per customer. Created implicitly on first upsert.
  // A search on this index can only ever return this customer's images.
  await client.index(image.customerId).upsert([
    {
      id: image.imageId,
      content: {
        image_url: image.imageUrl,
        ...(image.prompt ? { prompt: image.prompt } : {}),
      },
    },
  ]);
};
