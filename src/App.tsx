import Navigation from '@/components/Navigation';
import CustomCursor from '@/components/CustomCursor';
import Hero from '@/components/Hero';
import BrandWall from '@/components/BrandWall';
import SelectedWork from '@/components/SelectedWork';
import Services from '@/components/Services';
import Process from '@/components/Process';
import About from '@/components/About';
import FAQ from '@/components/FAQ';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

function App() {
  return (
    <>
      <a
        href="#brands"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:bg-teal focus:px-4 focus:py-3 focus:text-white"
      >
        Skip to content
      </a>
      <CustomCursor />
      <Navigation />
      <main>
        <Hero />
        <BrandWall />
        <SelectedWork />
        <Services />
        <Process />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
