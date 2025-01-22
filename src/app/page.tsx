import AGILifeTimeline from "@/components/interactive";
export default function Home() {
  return (
    <main className="flex max-w-screen-md mx-auto flex-col items-center justify-center px-2 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">
        Your life, before the singularity, in weeks
      </h1>
      <AGILifeTimeline />
    </main>
  );
}
