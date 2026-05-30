"use server";

import { Search } from "@upstash/search";

const upstash = Search.fromEnv();
const index = upstash.index("fuck-claude");

type SearchItem = {
  id: string;
  url: string;
  style: string;
};

type SearchResponse = { data: SearchItem[] } | { error: string };

export const search = async (
  _prevState: SearchResponse | undefined,
  formData: FormData,
): Promise<SearchResponse> => {
  const query = formData.get("search");

  if (!query || typeof query !== "string") {
    return { error: "Please enter a search query" };
  }

  try {
    const results = await index.search({ query, limit: 50 });

    return {
      data: results.map((result: any) => ({
        id: result.id,
        url:
          typeof result.content?.image_url === "string"
            ? result.content.image_url
            : "",
        style:
          typeof result.content?.style === "string" ? result.content.style : "",
      })),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return { error: message };
  }
};
