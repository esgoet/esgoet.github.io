import { useState} from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';


import { education } from '../constants';
import { textVariant, slideIn } from '../utils/motion';

import { SectionWrapper } from '../hoc';
import { portrait, interests, hobbies } from '../assets';
import SocialLinks from './SocialLinks';


const Profile = () => {
  const [toggle, setToggle] = useState(false);
  const dob = new Date(1997,6,16);
  const age = Math.abs(new Date(Date.now() - dob.getTime()).getUTCFullYear() - 1970);

  const EducationEntry = (props) => {
    return (
      <>
        <p className='text-start'>{props.degree}</p>
        <p className="italic text-[12px] text-end text-secondary">{props.university}</p>
      </>
    );
  }

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30,
    duration: 0.5,
  }
  
  return (
    <Tilt
      className="sm:-mt-24"
      options={{ max: 10, perspective: 700, axis: "x", scale: 1, speed: 450 }}
    >
      <div
        className={` w-[300px] h-[600px] rounded-full bg-primary flex ${
          !toggle ? "flex-col" : "flex-col-reverse"
        } justify-start items-center p-0.5 shadow-[inset_0_0_5px_3px_rgba(70,28,166,0.4)] border-solid border-[10px] border-black-100/90`}
      >
        <motion.div
          whileHover={{
            marginTop: !toggle ? 5 : -5,
            marginBottom: !toggle ? -5 : 5,
          }}
          className="w-[275px] h-[275px] rounded-full drop-shadow-md cursor-pointer"
          onClick={() => setToggle(!toggle)}
          layout
          transition={spring}
        >
          <img
            src={portrait}
            alt="Portrait of Eva Goetzke"
            className="rounded-full object-contain border-2 border-black-100/50 shadow-[0_0_3px_2px_rgba(70,28,166,0.2)]"
          />
        </motion.div>

        <div
          className={` ${
            toggle ? "hidden" : "flex"
          } m-4 flex-col gap-2 justify-start items-center w-full`}
        >
          <div className="flex flex-row gap-3 items-center  text-black-100/80">
            <p>
              <span className="font-bold">Eva Goetzke</span> ({age})
            </p>
            <div className="flex flex-col drop-shadow-sm w-[25px] h-[15px] items-stretch justify-center">
              <div className="h-1/3 bg-black m-0" />
              <div className="h-1/3  bg-red-700 m-0" />
              <div className="h-1/3 bg-amber-500 m-0" />
            </div>
          </div>
          <div className="flex flex-col gap-1 px-2.5 py-1 pb-4 w-full text-[14px] ">
            <div className="flex flex-row gap-2 justify-stretch items-stretch bg-black-200/50 rounded-2xl h-full">
              <div className="font-bold bg-black-200/50 p-2 pl-3 rounded-l-2xl h-full flex place-items-center">
                2023
              </div>
              <div className="p-2 pr-3 w-full">
                {education.map((entry) =>
                  entry.year === "2023" ? (
                    <EducationEntry key={entry.degree} {...entry} />
                  ) : null
                )}
              </div>
            </div>
            <div className="flex flex-row gap-2 items-center bg-black-200/50 rounded-2xl">
              <div className="font-bold bg-black-200/50 p-2 pl-3 rounded-l-2xl h-full flex items-center">
                <p className="">2020</p>
              </div>
              <div className="p-2 pr-3 w-full">
                {education.map((entry) =>
                  entry.year === "2020" ? (
                    <EducationEntry key={entry.degree} {...entry} />
                  ) : null
                )}
              </div>
            </div>
          </div>

          <SocialLinks />
        </div>
        <div
          className={` ${
            toggle ? "flex" : "hidden"
          } m-3 mt-8 flex-col justify-around items-center h-full`}
        >
          <p className="font-bold text-black-100/80">Eva Goetzke</p>
          <div className="flex flex-col items-center  gap-4 text-[14px]">
            <div className="flex flex-row gap-1 items-center bg-black-200/50 rounded-2xl">
              <img
                src={interests}
                alt={interests}
                className="w-[60px] h-full bg-black-200/50 rounded-l-2xl p-3"
              />
              <ul className="flex flex-wrap gap-1 p-3  rounded-2xl">
                <li>Accessibility</li>
                <li>Digital Education</li>
                <li>Mental Health Awareness</li>
              </ul>
            </div>
            <div className="flex flex-row gap-2 items-center bg-black-200/50 rounded-2xl">
              <img
                src={hobbies}
                alt={hobbies}
                className="w-[60px] h-full bg-black-200/50 rounded-l-2xl p-3"
              />
              <ul className="flex flex-wrap gap-1 justify-between p-3 rounded-2xl">
                <li>Coding</li>
                <li>3D Modelling</li>
                <li>Painting</li>
                {/* <li>Reading</li> */}
                <li>Volleyball</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
}


const About = ({isMobile}) => {

  return (
    <>
      {/* <div> */}
      <motion.div variants={textVariant()} className='2xl:place-self-start'>
        <p className="sectionSubText">Who I Am</p>
        <h2 className="sectionHeadText">About Me.</h2>
      </motion.div>
      {/* </div> */}
      <div className="mt-4 flex flex-col-reverse sm:flex-row items-center sm:items-start gap-4 2xl:gap-20 2xl:place-self-start">
        <div className="text-white-100 text-[17px] max-w-prose leading-[30px] p-6 sm:p-2 rounded-2xl snap-center sm:snap-align-none">
          {/* <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-white-100 text-[17px] max-w-3xl leading-[30px] bg-black-300/50 p-8 rounded-2xl"
        > */}
          <p>
            While I can't (literally) moonwalk in real life, I can certainly
            pull it off virtually! Enhancing accessibility to otherwise
            restricted experiences through digital technology is a key passion
            of mine. With a background in clinical psychology and a love for art
            and design, I'm driven to create beautiful and user-centric digital
            solutions that enhance everyday life.
          </p>
          <p className="pt-4">
            I bring a versatile skill set to the table, ranging from web
            development to game design and VR applications. Explore my portfolio{" "}
            <a href="#work" className="underline pointer-cursor">
              below
            </a>{" "}
            to see my work in action.
          </p>
          {/* <p className="py-2">
            With my background in Psychology, I not only bring expertise in
            usability and accessibility, but can also bridge the gap between
            research and development of digital psychological interventions.
          </p> */}
          {/* <p className="font-semibold text-white-100 py-2">
            Feel free to <a href="#contact">reach out</a> with inquiries or join
            me on a mission to enhance lives – together, we'll boldly go where
            no code has gone before!
          </p> */}
          {/* </motion.div> */}
        </div>
        {!isMobile ? (
          <motion.div
            variants={slideIn("right", "tween", 0.1, 1)}
            // className="-mt-24"
          >
            <Profile />
          </motion.div>
        ) : (
          <div className="snap-center">
            <Profile />
          </div>
        )}
      </div>

      {/* <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div> */}
    </>
  );
};

export default SectionWrapper(About, 'about')