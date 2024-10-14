import { motion } from 'framer-motion';
import { textVariant, slideIn } from '../utils/motion';
import { SectionWrapper } from '../hoc';
import Profile from "./Profile.jsx";


const About = ({isMobile}) => {
  return (
    <>
      <motion.div variants={textVariant()} className='2xl:place-self-start'>
        <p className="sectionSubText">Who I Am</p>
        <h2 className="sectionHeadText">About Me.</h2>
      </motion.div>
      <div className="mt-4 flex flex-col-reverse sm:flex-row items-center sm:items-start gap-4 2xl:gap-20 2xl:place-self-start">
        <div className="text-white-100 text-[17px] max-w-prose leading-[30px] p-6 sm:p-2 rounded-2xl snap-center sm:snap-align-none">
          <p>
            While I can't (literally) moonwalk in real life, I can certainly
            pull it off virtually! Enhancing accessibility to otherwise
            restricted experiences through digital technology is a key passion
            of mine. With a background in clinical psychology and a love for art
            and design, I'm driven to create beautiful and user-centric digital
            solutions that enhance everyday life.
          </p>
          <p className="pt-4">
            I bring a versatile skill set to the table, ranging from full stack web
            development to game design and VR applications. Explore my portfolio{" "}
            <a href="#projects" className="underline pointer-cursor">
              below
            </a>{" "}
            to see my work in action.
          </p>
        </div>
        {!isMobile ? (
          <motion.div
            variants={slideIn("right", "tween", 0.1, 1)}
          >
            <Profile />
          </motion.div>
        ) : (
          <div className="snap-center">
            <Profile />
          </div>
        )}
      </div>
    </>
  );
};

export default SectionWrapper(About, 'about')