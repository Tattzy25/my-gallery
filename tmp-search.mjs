import "dotenv/config";
import { Search } from "@upstash/search";

const client = new Search({
  url: process.env.UPSTASH_SEARCH_REST_URL,
  token: process.env.UPSTASH_SEARCH_REST_TOKEN,
});

const index = client.index("user-gallery");

const query = process.argv[2];

if (query) {
  const res = await index.search({ query, limit: 50 });
  console.log("SEARCH query:", query);
  console.log(JSON.stringify(res, null, 2));
} else {
  const res = await index.range({ cursor: "0", limit: 50 });
  console.log("RANGE (all docs in user-gallery):");
  console.log(JSON.stringify(res, null, 2));
}
