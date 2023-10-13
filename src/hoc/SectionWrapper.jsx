import {useState, useEffect, useRef, useContext} from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";


const SectionWrapper = (Component, idName) => function HOC() {
  const [isMobile, setIsMobile] = useState(false);



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
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: !isMobile ? 0.25 : 0.1 }}
        className={`${styles.paddingX} max-w-7xl mx-auto lg:min-h-screen 2xl:min-h-0 my-8 snap-start snap-always`}
      >
        <span className="hash-span" id={idName}></span>
        <Component />
      </motion.section>
    );
}

export default SectionWrapper