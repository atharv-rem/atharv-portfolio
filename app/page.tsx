import Hero from "./components/hero"
import GitHubPage from "./components/github_page"

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#FAFAFA] relative">
      <div className="absolute inset-0 z-0" />
      <div className="bg-white flex min-h-screen flex-col items-center justify-between w-full max-w-[450px] px-4 border-l border-r relative z-10">
        <Hero />
        <GitHubPage />
      </div>
    </main>
  );
}
