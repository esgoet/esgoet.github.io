import React, {useEffect, useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';

import {styles} from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
// import { useSpring, animated } from '@react-spring/web';

// import { SectionContext } from '../hoc';


const Navbar = () => {
  const [active, setActive] = useState('')
  const [toggle, setToggle] = useState(false)
  const { scrollY, scrollYProgress } = useScroll();

  // const [activeSection, setActiveSection] = useState(null);
  const observer = useRef(null);

  useEffect(() => {
    //create new instance and pass a callback function
    observer.current = new IntersectionObserver((entries) => {

      const visibleSection = entries.find(
        (entry) => entry.isIntersecting
      )?.target;

      //Update state with the visible section ID
      if (visibleSection) {
        // setActiveSection(visibleSection.id);
        setActive(visibleSection.id)
        
      }
    });

    //Get custom attribute data-section from all sections
    const sections = document.querySelectorAll(".hash-span");

    sections.forEach((section) => {
      observer.current.observe(section);
    });

    //Cleanup function to remove observer
    return () => {
      sections.forEach((section) => {
        observer.current.unobserve(section);
      });
    };
  }, []);

  //use framer-motion instead

  //  const { y } = useSpring({
  //    from: { y: 60 },
  //    y: toggle ? 75 : 60,
  //    config: { duration: 300 },
  //  });

   const scaleX = useSpring(scrollYProgress, {
     stiffness: 100,
     damping: 30,
     restDelta: 0.001,
   });

  return (
    <>
      <nav
        className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 bg-primary drop-shadow-md z-30`}
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto z-20 ">
          <Link
            to="/"
            className="flex items-center gap-2 z-20"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <img src={logo} alt="logo" className="w-9 h-9 object-contain" />
            <p className="text-white text-[18px] font-bold cursor-pointer flex z-20">
              Eva Goetzke &nbsp;{" "}
              <span className="sm:block hidden">
                | &nbsp;Creative Developer
              </span>
            </p>
          </Link>
          <ul className="list-none hidden sm:flex flex-row gap-10">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.id ? "text-white" : "text-secondary"
                }
              hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(link.id)}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>
          <div className="sm:hidden flex flex-none justify-end items-center">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain cursor-pointer z-20"
              onClick={() => setToggle(!toggle)}
            />
          </div>
        </div>
        {/* <animated.div
          style={{ top: y }}
          className={`${
            !toggle ? "hidden" : "flex "
          } py-3 px-6 bg-black-100 absolute right-0 w-full z-10 border-b-4 border-primary`}
        >
          <ul className="list-none flex flex-row items-end justify-end w-full gap-8">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.title ? "text-tertiary" : "text-white"
                } font-roboto font-medium cursor-pointer text-[16px]`}
                onClick={() => {
                  setActive(link.title);
                  setToggle(!toggle);
                }}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>
        </animated.div> */}
      </nav>
      <motion.div
        style={{ scaleX }}
        className={`fixed h-[5px] w-full top-[75px] bg-white z-20 origin-[0%]`}
      />
    </>
  );
}

export default Navbar