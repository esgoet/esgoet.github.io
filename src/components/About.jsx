import React from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
// import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

import { SectionWrapper } from '../hoc';

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
      <div className="mt-4 text-white text-[17px] max-w-3xl leading-[30px] bg-black-200/50 p-8 rounded-2xl">
        {/* <motion.div
          variants={fadeIn("", "", 0.1, 1)}
          className="mt-4 text-white text-[17px] max-w-3xl leading-[30px] bg-black-200/50 p-8 rounded-2xl"
        > */}
          <p className="py-2">
            While (literal) moonwalking exceeds both my physical and
            professional capacities, being able to develop a virtual experience like it is almost as good. 
            I want to develop technology that goes beyond what is possible in the physical world, for example how students can learn in a virtual classroom.
            I'm an interdisciplinary software developer with a passion
            for developing digital tools to improve everyday life, for example
            through education or mental health interventions. I have experience
            in JavaScript, with expertise in frameworks like React, Node.js and
            Three.js, as well as C# in the context of game design and VR
            applications.
          </p>
          <p className="py-2">
            With my background in Psychology, I not only bring expertise in
            usability and accessibility, but can also bridge the gap between
            research and development of digital psychological interventions.
          </p>
          <p className="font-semibold text-white py-2">
            Let's explore how we can make people's life better together!
          </p>
        {/* </motion.div> */}
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