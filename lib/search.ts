// lib/search.ts
import { Search } from "@upstash/search";

// Use the REST envs from the Search docs
// UPSTASH_SEARCH_REST_URL
// UPSTASH_SEARCH_REST_TOKEN
export const searchClient = new Search({
  url: process.env.UPSTASH_SEARCH_REST_URL!,
  token: process.env.UPSTASH_SEARCH_REST_TOKEN!,
});
