import { BrowserRouter } from "react-router-dom";
import { useEffect } from "react";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Works, MoonCanvas, StarsCanvas, Footer } from './components';

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
        <Footer />

        {/* <div className="relative z-0"></div> */}
      </div>
    </BrowserRouter>
  );
}

export default App
