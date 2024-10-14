import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { About, Contact, Hero, Navbar, Projects, StarsCanvas, Footer } from './components';
import { MotionConfig } from "framer-motion";

const App = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);
    const handleMediaQueryChange = (event) => {
 
      setIsMobile(event.matches);
      
    };
    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <div
          className="relative z-0 bg-black-200"
        >
          <Navbar />
          <StarsCanvas />

          <Hero />
          <About isMobile={isMobile} />
          <Projects  />
          <Contact />
          <Footer />
        </div>
      </MotionConfig>
    </BrowserRouter>
  );
}

export default App
