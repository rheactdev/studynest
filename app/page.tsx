import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center p-6">
        <Button>Text</Button>
      </main>
    </>
  );
}
