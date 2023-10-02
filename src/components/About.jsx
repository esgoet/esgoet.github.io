import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
// import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

import { SectionWrapper } from '../hoc';
import { portrait } from '../assets';

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


const About = () => {
  return (
    <>
      <div>
        {/* <motion.div variants={textVariant()}> */}
        <p className={styles.sectionSubText}>Who I Am</p>
        <h2 className={styles.sectionHeadText}>About Me.</h2>
        {/* </motion.div> */}
      </div>
      <div className="flex flex-col-reverse sm:flex-row">
        <div className="mt-4 text-white text-[17px] max-w-3xl leading-[30px] bg-black-200/50 p-8 rounded-2xl sm:pr-40">
          {/* <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-white text-[17px] max-w-3xl leading-[30px] bg-black-200/50 p-8 rounded-2xl"
        > */}
          <p className="py-2">
            While I can't (literally) moonwalk in real life, I can certainly
            pull it off virtually! Enhancing accessibility to otherwise
            restricted experiences through digital technology is a key passion of
            mine. With a background in clinical psychology and a love for art
            and design, I'm driven to create beautiful and user-centric digital
            solutions that enhance everyday life.
          </p>
          <p className="py-2">
            I bring a versatile skill set to the table, ranging from web
            development to game design and VR applications. 
            Explore my portfolio <a href="#work">below</a> to see my work in action.
          </p>
          {/* <p className="py-2">
            With my background in Psychology, I not only bring expertise in
            usability and accessibility, but can also bridge the gap between
            research and development of digital psychological interventions.
          </p> */}
          <p className="font-semibold text-white py-2">
            Feel free to <a href="#contact">reach out</a> with inquiries or join
            me on a mission to enhance lives – together, we'll boldly go where
            no code has gone before!
          </p>
          {/* </motion.div> */}
        </div>
        <div className="sm:relative -left-32 top-5 sm:max-w-[30vw]">
          <img
            src={portrait}
            alt="Portrait of Eva Goetzke"
            className="rounded-full border-3 drop-shadow-md border-primary border-solid"
          />
        </div>
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