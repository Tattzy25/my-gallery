// components/results.client.tsx
import { ImageIcon } from "lucide-react";
import { Preview } from "./preview";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "./ui/empty";
import type { ImageItem } from "./results";

type Props = {
  initialData: ImageItem[];
};

const PRIORITY_COUNT = 12;

export function ResultsClient({ initialData }: Props) {
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

  return (
    <div className="columns-2 gap-4 sm:columns-3 md:columns-3">
      {initialData.map((item, index) => (
        <Preview key={item.id} priority={index < PRIORITY_COUNT} url={item.url} />
      ))}
    </div>
  );
}
