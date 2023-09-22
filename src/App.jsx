import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Works, MoonCanvas, StarsCanvas } from './components';

const App = () => {


  return (
    <BrowserRouter>
      <div className="relative z-0 bg-black-100">
        <Navbar />
        <StarsCanvas />

        <Hero />

        <About />
        {/* <MoonCanvas /> */}
        {/* <Experience/> */}
        <Works />
        <Contact />

        {/* <div className="relative z-0"></div> */}
      </div>
    </BrowserRouter>
  );
}

export default App
