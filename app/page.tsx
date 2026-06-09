import Hero from "./components/hero"
import GitHubPage from "./components/github_page"
import Language from "./components/language"
import Contact from "./components/contact"
import Footer from "./components/footer"
import BottomNavbar from "./components/bottom-navbar"

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-[#FAFAFA] dark:bg-neutral-950 relative">
      <div className="absolute inset-0 z-0" />
      <div className="bg-white dark:bg-neutral-900 flex min-h-screen flex-col items-center justify-between w-full max-w-[450px] px-4 border-l border-r border-neutral-200 dark:border-neutral-800 relative z-10">
        <Hero />
        <GitHubPage />
        <Language />
        <Contact />
        <BottomNavbar />
        <Footer />
      </div>
    </main>
  );
}
