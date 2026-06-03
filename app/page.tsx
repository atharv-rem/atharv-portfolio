import Hero from "./components/hero"

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#FAFAFA] relative">
      <div className="absolute inset-0 dashed-grid pointer-events-none z-0" />
      <div className="flex min-h-screen flex-col items-center justify-between w-full max-w-[450px] px-4 border-l border-r relative z-10 dot-grid">
        <Hero />
      </div>
    </main>
  );
}
