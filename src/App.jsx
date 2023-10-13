import { BrowserRouter } from "react-router-dom";
import { useEffect, useState } from "react";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Works, MoonCanvas, StarsCanvas, Footer } from './components';
import { MotionConfig } from "framer-motion";

const App = () => {


  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <div className="relative z-0 bg-black-100 ">
          <Navbar />
          <StarsCanvas />

          <Hero />
          <div className="snap-y snap-mandatory">
            <About />
            {/* <MoonCanvas /> */}
            {/* <Experience/> */}
            <Works />
            <Contact />
          </div>

          <Footer />

          {/* <div className="relative z-0"></div> */}
        </div>
      </MotionConfig>
    </BrowserRouter>
  );
}

export default App
