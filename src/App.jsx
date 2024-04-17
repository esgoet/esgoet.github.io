import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { About, Contact, Hero, Navbar, Projects, MoonCanvas, StarsCanvas, Footer } from './components';
import { MotionConfig } from "framer-motion";

const App = () => {
  const [isMobile, setIsMobile] = useState(true);


  useEffect(() => {
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
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

          <Hero  isMobile={isMobile}/>
          {/* <div className="relative snap-y snap-mandatory"> */}
          <About isMobile={isMobile} />
          {/* <MoonCanvas /> */}
          <Projects   isMobile={isMobile}/>
          <Contact  isMobile={isMobile} />
          {/* </div> */}

          <Footer />

          {/* <div className="relative z-0"></div> */}
        </div>
      </MotionConfig>
    </BrowserRouter>
  );
}

export default App
