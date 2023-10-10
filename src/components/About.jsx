import React, { useState, useEffect } from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { education } from '../constants';
import { fadeIn, textVariant, slideIn } from '../utils/motion';

import { SectionWrapper } from '../hoc';
import { portrait, interests, hobbies } from '../assets';

const ServiceCard = ({index, title, icon}) => {
  return (
    <Tilt className='xs:w-[250px] w-full'>
      <motion.div variants={fadeIn('right', 'spring', 0.5 * index, 0.75)}
      className='w-full green-pink-gradient p-[1pc] rounded-[20px] shadow-card'>
        <div options={{max: 45, scale: 1, speed: 450}}
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'>
          <img src={icon} alt={title} className='w-166 h-16 object-contain'/>
          <h3 className='text-white text-[20px] font-bold text-center'>{title}</h3>
        </div>
      </motion.div>
    </Tilt>
  )
}

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
    <Tilt options={{ max: 5, scale: 1, speed: 450 }}>
      <div
        className={` w-[300px] h-[600px] rounded-full bg-primary flex ${
          !toggle ? "flex-col" : "flex-col-reverse"
        } justify-start items-center p-0.5 shadow-[inset_0_0_3px_3px_rgba(70,3,100,0.15)] border-solid border-[10px] border-secondary`}
      >
        <motion.div
          whileHover={{
            marginTop: !toggle ? 5 : -5,
            marginBottom: !toggle ? -5 : 5,
          }}
          className="w-[280px] h-[280px] rounded-full drop-shadow-md cursor-pointer"
          onClick={() => setToggle(!toggle)}
          layout
          transition={spring}
        >
          <img
            src={portrait}
            alt="Portrait of Eva Goetzke"
            className="rounded-full object-contain"
          />
        </motion.div>

        <div
          className={` ${
            toggle ? "hidden" : "flex"
          } m-3 flex-col gap-2 justify-start items-center w-full`}
        >
          <div className="flex flex-row gap-3 items-center">
            <p className="pb-1">
              <span className="font-bold">Eva Goetzke</span> ({age})
            </p>
          </div>
          <div className="flex flex-col gap-1 px-2 w-full text-[14px] ">
            <div className="py-1 flex flex-row gap-2 items-center justify-stretch bg-black-100/50 p-1 rounded-2xl">
              <p className="ml-1 font-bold bg-black-100/50 p-2 rounded-2xl">
                2023
              </p>
              <div className="p-1 w-full">
                {education.map((entry) =>
                  entry.year === "2023" ? (
                    <EducationEntry key={entry.degree} {...entry} />
                  ) : null
                )}
              </div>
            </div>
            <div className="py-1 flex flex-row gap-2 items-center bg-black-100/50 p-1 rounded-2xl">
              <p className="ml-1 font-bold bg-black-100/50 p-2 rounded-2xl">
                2020
              </p>
              <div className="p-1 pr-2 w-full">
                {education.map((entry) =>
                  entry.year === "2020" ? (
                    <EducationEntry key={entry.degree} {...entry} />
                  ) : null
                )}
              </div>
            </div>
          </div>
          <div className="mt-5 flex flex-col drop-shadow-sm w-[30px] h-[20px] items-stretch justify-center">
            <div className="h-1/3 bg-black m-0" />
            <div className="h-1/3  bg-red-700 m-0" />
            <div className="h-1/3 bg-amber-500 m-0" />
          </div>
        </div>
        <div
          className={` ${
            toggle ? "flex" : "hidden"
          } m-3 mt-8 flex-col justify-around items-center h-full`}
        >
          <p className="font-bold">Eva Goetzke</p>
          <div className="flex flex-col items-center  gap-4 text-[14px]">
            <div className="flex flex-row gap-1 justify-center items-center bg-black-100/50 p-1 rounded-2xl">
              <img
                src={interests}
                alt={interests}
                className="w-[50px] h-[50px] bg-black-100/50 rounded-full p-1.5 ml-1"
              />
              <ul className="flex flex-wrap gap-1 p-2  rounded-2xl">
                <li>Accessibility</li>
                <li>Digital Education</li>
                <li>Mental Health Awareness</li>
              </ul>
            </div>
            <div className="flex flex-row gap-2 items-center bg-black-100/50 p-1 rounded-2xl">
              <img
                src={hobbies}
                alt={hobbies}
                className="w-[50px] h-[50px] bg-black-100/50 rounded-full p-1.5 ml-1"
              />
              <ul className="flex flex-wrap gap-1 justify-between p-2 rounded-2xl">
                <li>Coding</li>
                <li>3D Modelling</li>
                <li>Painting</li>
                <li>Reading</li>
                <li>Volleyball</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Tilt>
  );
}


const About = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
      // Add a listener for changes to the screen size
      const mediaQuery = window.matchMedia("(max-width: 500px)");

      // Set the initial value of the `isMobile` state variable
      setIsMobile(mediaQuery.matches);

      // Define a callback function to handle changes to the media query
      const handleMediaQueryChange = (event) => {
        console.log("isMobile: " + isMobile);
        console.log(event);
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
    <>
      {/* <div> */}
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Who I Am</p>
        <h2 className={styles.sectionHeadText}>About Me.</h2>
      </motion.div>
      {/* </div> */}
      <div className="mt-4 flex flex-col-reverse sm:flex-row items-center sm:items-start gap-4">
        <div className="text-white text-[17px] max-w-3xl leading-[30px] bg-black-200/50 p-8 rounded-2xl sm:pr-40">
          {/* <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-white text-[17px] max-w-3xl leading-[30px] bg-black-200/50 p-8 rounded-2xl"
        > */}
          <p className="py-2">
            While I can't (literally) moonwalk in real life, I can certainly
            pull it off virtually! Enhancing accessibility to otherwise
            restricted experiences through digital technology is a key passion
            of mine. With a background in clinical psychology and a love for art
            and design, I'm driven to create beautiful and user-centric digital
            solutions that enhance everyday life.
          </p>
          <p className="py-2">
            I bring a versatile skill set to the table, ranging from web
            development to game design and VR applications. Explore my portfolio{" "}
            <a href="#work">below</a> to see my work in action.
          </p>
          {/* <p className="py-2">
            With my background in Psychology, I not only bring expertise in
            usability and accessibility, but can also bridge the gap between
            research and development of digital psychological interventions.
          </p> */}
          {/* <p className="font-semibold text-white py-2">
            Feel free to <a href="#contact">reach out</a> with inquiries or join
            me on a mission to enhance lives – together, we'll boldly go where
            no code has gone before!
          </p> */}
          {/* </motion.div> */}
        </div>
        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          initial={isMobile ? "isMobile" : "hidden"}
          whileInView={isMobile ? "isMobile" : "show"}
          className="sm:relative -left-36 -top-24 "
        >
          <Profile />
        </motion.div>
      </div>

      {/* <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div> */}
    </>
  );
}

export default SectionWrapper(About, 'about')