"use client";

import { ArrowLeftIcon, FileIcon, ImageIcon, Loader2Icon } from "lucide-react";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { search } from "@/app/actions/search";
import { Preview } from "./preview";
import { Button } from "./ui/button";
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "./ui/empty";
import { Input } from "./ui/input";
import type { GalleryItem } from "./results";

type ResultsClientProps = {
  initialData: GalleryItem[];
};

const PRIORITY_COUNT = 12;

export const ResultsClient = ({ initialData }: ResultsClientProps) => {
  const [state, formAction, isPending] = useActionState(search, undefined);

  useEffect(() => {
    if (state && "error" in state) {
      toast.error(state.error);
    }
  }, [state]);

  const reset = () => {
    window.location.reload();
  };

  const hasSearchState = !!state && "data" in state;
  const displayData = hasSearchState ? state.data : initialData;

  const validDisplayData = displayData.filter(
    (item): item is GalleryItem =>
      !!item && typeof item.url === "string" && item.url.trim() !== "",
  );

  const hasImages = validDisplayData.length > 0;

  return (
    <>
      {hasImages ? (
        <div className="columns-2 gap-4 sm:columns-3 md:columns-4">
          {validDisplayData.map((item, index) => (
            <Preview
              key={item.id}
              priority={index < PRIORITY_COUNT}
              url={item.url}
            />
          ))}
        </div>
      ) : (
        <Empty className="h-full min-h-[50vh] rounded-lg border">
          <EmptyHeader className="max-w-none">
            <div className="relative isolate mb-8 flex">
              <div className="-rotate-12 translate-x-2 translate-y-2 rounded-full border bg-background p-3 shadow-xs">
                <ImageIcon className="size-5 text-muted-foreground" />
              </div>
              <div className="z-10 rounded-full border bg-background p-3 shadow-xs" />
              <div className="-translate-x-2 translate-y-2 rotate-12 rounded-full border bg-background p-3 shadow-xs">
                <FileIcon className="size-5 text-muted-foreground" />
              </div>
            </div>
            <EmptyTitle>No images found</EmptyTitle>
            <EmptyDescription>No images in the gallery yet.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      )}

      <form
        action={formAction}
        className="-translate-x-1/2 fixed bottom-8 left-1/2 flex w-full max-w-sm items-center gap-1 rounded-full bg-background p-1 shadow-xl sm:max-w-lg"
      >
        {hasSearchState && (
          <Button
            className="shrink-0 rounded-full"
            disabled={isPending}
            onClick={reset}
            size="icon"
            type="button"
            variant="ghost"
          >
            <ArrowLeftIcon className="size-4" />
          </Button>
        )}

        <Input
          className="w-full rounded-full border-none bg-secondary shadow-none outline-none"
          disabled={isPending}
          id="search"
          name="search"
          placeholder="Search by description"
          required
        />

        {isPending ? (
          <Button className="shrink-0" disabled size="icon" variant="ghost">
            <Loader2Icon className="size-4 animate-spin" />
          </Button>
        ) : (
          <span
            className="flex size-9 shrink-0 items-center justify-center text-foreground"
            style={{
              fontFamily: "var(--font-rock-salt), cursive",
              fontSize: "1rem",
            }}
          >
            T
          </span>
        )}
      </form>
    </>
  );
};
