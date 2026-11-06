import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import StudioIntro from '@/components/StudioIntro';
import SelectedWork from '@/components/SelectedWork';
import Services from '@/components/Services';
import About from '@/components/About';
import WhyBackroom from '@/components/WhyBackroom';
import Process from '@/components/Process';
import Contact from '@/components/Contact';
import CallToAction from '@/components/CallToAction';
import Footer from '@/components/Footer';

function App() {
  return (
    <>
      <a
        href="#studio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-teal focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <StudioIntro />
        <SelectedWork />
        <Services />
        <About />
        <WhyBackroom />
        <Process />
        <Contact />
        <CallToAction />
      </main>
      <Footer />
    </>
  );
}

export default App;
