import {useState, useEffect} from "react";
import { motion } from "framer-motion";


import { staggerContainer } from "../utils/motion";


const SectionWrapper = (Component, idName) => function HOC() {
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
      <motion.section
        data-section
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: !isMobile ? 0.25 : 0.1 }}
        className={`paddingX max-w-7xl mx-auto lg:min-h-screen my-8 xl:my-8`}
      >
        <span className="hash-span snap-start 2xl:snap-align-none sm:snap-always" id={idName}></span>
   
        <div className="2xl:snap-center 2xl:flex flex-col place-items-center place-content-center 2xl:h-screen">

        <Component/>
          
        </div>

      </motion.section>
    );
}

export default SectionWrapper