import { searchClient } from "@/lib/search";
import { ResultsClient } from "./results.client";

export type ImageItem = { id: string; url: string; style?: string };

async function fetchInitial(customerId: string): Promise<ImageItem[]> {
  const index = searchClient.index(`customer-${customerId}`);

  const res: any = await index.range({
    cursor: "0",
    limit: 50,
  });

  return (res.documents as any[])
    .map((doc) => ({
      id: String(doc.id),
      url: String(doc.content?.image_url ?? ""),
      style: doc.content?.style ? String(doc.content.style) : undefined,
    }))
    .filter((d) => d.url.trim().length > 0);
}

export const Results = async ({ customerId }: { customerId: string }) => {
  const initialData = await fetchInitial(customerId);
  return <ResultsClient initialData={initialData} />;
};
