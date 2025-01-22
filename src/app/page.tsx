import Interactive from "@/components/interactive";
export default function Home() {
  return (
    <>
      <main className="flex-grow flex max-w-screen-md mx-auto flex-col items-center px-4 py-12 gap-6">
        <h1 className="text-4xl font-bold mb-8 text-center [&_span]:inline-block">
          <span>Your life</span> <span>(before the singularity)</span>{" "}
          <span>in weeks</span>
        </h1>
        <Interactive />
      </main>
      <footer className="text-center text-gray-500 mx-4">
        <p>
          Based on Bryan Braun&apos;s{" "}
          <a href="https://www.bryanbraun.com/your-life/weeks.html">
            interactive version
          </a>{" "}
          of Tim Urban&apos;s post{" "}
          <a href="https://waitbutwhy.com/2014/05/life-weeks.html">
            Your Life in Weeks
          </a>
          .
        </p>
      </footer>
    </>
  );
}
