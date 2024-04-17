import {motion } from 'framer-motion';
import { slideIn } from "../utils/motion";

import { Canvas } from '@react-three/fiber';
import { useScroll, animated } from "@react-spring/web";

import { MoonCanvas } from './canvas';


const Hero = ({isMobile}) => {
  const { scrollYProgress } = useScroll(); 
 

  return (
    <>
      {/* <section className="relative w-full h-screen mx-auto">*/}
      <section
        className={`relative sm:h-screen pt-20 sm:pt-0 mx-auto flex sm:flex-row flex-col-reverse justify-center items-center snap-center snap-always`}
      >
        {/* <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] flex gap-10 xl:flex-row flex-row flex-nowrap items-center justify-center"
        > */}
        <span className="hash-span" id="hero"></span>
        <div className="flex-initial sm:max-w-[50vw] sm:min-w-[50vw] max-w-[90vw] flex flex-row flex-nowrap sm:place-items-center sm:place-content-center -ml-5 sm:ml-0 items-start justify-start">
          <div
            className={`flex flex-col justify-center items-center mt-5 paddingX`}
          >
            <div className="w-5 h-5 rounded-full bg-primary" />
            <div className="w-1 sm:h-80 h-40 violet-gradient" />
          </div>
          <div className="flex flex-col gap-3 items-start">
            <h1 className={`heroHeadText text-white-100-10 drop-shadow-text`}>
              Hi, I'm{" "}
              <span className="text-primary font-['Lobster']">
                Eva
              </span>
            </h1>
            <p className="font-light sm:text-[18px] text-[14px] text-tertiary -mt-4">
              MSc Interactive Media | MSc Clinical Psychology
            </p>
            <p className={`heroSubText text-white-100-100 max-w-sm`}>
              I love creating interactive digital tools{" "}
              {/* <br className="sm:block hidden" /> */}
              that are beautiful, accessible and{" "}
              {/* <br className="sm:block hidden" /> */}
              improve our daily life.
            </p>
            <a
              href="#contact"
              className="p-4 rounded-full bg-black-100/50 font-medium text-tertiary mt-3 mb-6 tracking-wider"
            >
              GET IN TOUCH
            </a>
          </div>
        </div>
        {/* </motion.div> */}

        <div className="flex-1 w-full sm:max-w-[50vw] min-w-[50wh] 2xl:h-min-[820px] 2xl:h-[820px] lg:h-[650px] md:h-[550px] h-[350px]">
          <MoonCanvas isMobile={isMobile} />
        </div>

        <div className="invisible sm:visible absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center drop-shadow-md z-20">
          <a href="#about">
            <div className="w-[34px] h-[58px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="w-1.5 h-2.5 rounded-full bg-secondary mb-1"
              />
            </div>
          </a>
        </div>
      </section>

      {/* </section> */}
    </>
  );
}

export default Hero