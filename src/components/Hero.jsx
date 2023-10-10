import {motion } from 'framer-motion';
import { slideIn } from "../utils/motion";
import { styles } from '../styles';
import { Canvas } from '@react-three/fiber';
import { useScroll, animated } from "@react-spring/web";

import { MoonCanvas } from './canvas';


const Hero = () => {
  const { scrollYProgress } = useScroll(); 
 

  return (
    <>
      {/* <section className="relative w-full h-screen mx-auto">*/}
      <section
        className={`relative lg:h-screen mx-auto flex lg:flex-row flex-col-reverse justify-center items-center`}
      >
        {/* <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] flex gap-10 xl:flex-row flex-row flex-nowrap items-center justify-center"
        > */}
        <div className="flex-initial lg:max-w-[50vw] min-w-[50wh] flex flex-row flex-nowrap items-center justify-start">
          <div className={`flex flex-col justify-center items-center mt-5 ${styles.paddingX}`}>
            <div className="w-5 h-5 rounded-full bg-primary z-10" />
            <div className="w-1 sm:h-80 h-40 violet-gradient z-10" />
          </div>
          <div className="flex flex-col gap-3 items-start z-10">
            <h1 className={`${styles.heroHeadText} text-white-100`}>
              Hi, I'm{" "}
              <span className="text-primary font-['Lobster']  drop-shadow-lg">
                Eva
              </span>
            </h1>
            <p className="font-light text-[18px] text-tertiary -mt-4">
              MSc Interactive Media | MSc Clinical Psychology
            </p>
            <p className={`${styles.heroSubText} text-white-100 max-w-sm`}>
              I love creating interactive digital tools{" "}
              {/* <br className="sm:block hidden" /> */}
              that are beautiful, accessible and{" "}
              {/* <br className="sm:block hidden" /> */}
              improve our daily life.
            </p>
            <a href='#contact' className='p-4 rounded-full bg-black-200/50 font-bold mt-3'>GET IN TOUCH</a>
          </div>
        </div>
        {/* </motion.div> */}

        <div className="flex-1 lg:max-w-[50vw] min-w-[50wh] 2xl:h-min-[820px] xl:h-[820px] md:h-[550px] h-[350px]">
          <MoonCanvas />
        </div>

        <div className="invisible lg:visible absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center drop-shadow-md z-20">
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