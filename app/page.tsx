import type { Metadata } from "next";
import { Suspense } from "react";
import { Results } from "@/components/results";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "gallery.tattty.com",
  description: "gallery.tattty.com",
};

const ImagesSkeleton = () => (
  <div className="columns-3 gap-4">
    {Array.from({ length: 9 }, (_, idx) => {
      const aspects = ["aspect-square", "aspect-video", "aspect-[9/16]"];
      const aspect = aspects[idx % aspects.length];
      return (
        <div
          className={`mb-4 rounded-xl bg-card p-2 shadow-xl ${aspect}`}
          key={`skeleton-${aspect}-${idx}`}
        />
      );
    })}
  </div>
);

type HomeProps = {
  searchParams: Promise<{ customerId?: string }>;
};

const Home = async ({ searchParams }: HomeProps) => {
  const { customerId } = await searchParams;

  if (!customerId) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Button asChild size="lg">
          <a href="https://account.tattty.com/">Sign In</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen rounded-[24px]">
      <div className="relative w-full py-8">
        <Suspense fallback={<ImagesSkeleton />}>
          <Results customerId={customerId} />
        </Suspense>
      </div>
    </div>
  );
};

export default Home;
