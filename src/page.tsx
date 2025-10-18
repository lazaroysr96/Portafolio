import { ContactSection } from "./components/contact-section";
import { HeroSection } from "./components/hero-section";
import { Timeline } from "./components/timeline2";


export default function Home() {
  return (
    <main className="relative min-h-screen">
      <HeroSection />
      <Timeline />
      <ContactSection />
    </main>
  )
}
