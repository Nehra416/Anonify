import CTA from "@/components/sections/CTA";
import Features from "@/components/sections/Features";
import Footer from "@/components/sections/Footer";
import Hero from "@/components/sections/Hero";
import Improve from "./improve/page";


export default function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <CTA />
      <Improve />
      <Footer />
    </main>
  );
}
