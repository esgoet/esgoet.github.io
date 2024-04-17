import React, {useEffect, useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useSpring, useMotionValueEvent, easeIn, easeOut } from 'framer-motion';

import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import { slideIn, textVariant } from '../utils/motion';
// import { useSpring, animated } from '@react-spring/web';

// import { SectionContext } from '../hoc';


const Navbar = () => {
  const [active, setActive] = useState('')
  const [toggle, setToggle] = useState(false)
  const { scrollY, scrollYProgress } = useScroll();

  // // get and set current active section when scrolling
  // const sections = useRef([]);

  // const handleScroll = () => {
  //   const pageYOffset = scrollY.current;
  //   let newActiveSection = null;

  //   console.log(pageYOffset)

  //   sections.current.forEach((section) => {
  //     const sectionOffsetTop = section.offsetTop;
  //     const sectionHeight = section.offsetHeight;

  //     console.log(
  //       section.children[0].id +
  //         ": top-" +
  //         sectionOffsetTop +
  //         ", height-" +
  //         sectionHeight
  //     );

  //     if (pageYOffset >= sectionOffsetTop && pageYOffset < sectionOffsetTop + sectionHeight) {
  //       //get id from .hash-span element
  //       newActiveSection = section.children[0].id;
  //     }
  //   });

  //   setActive(newActiveSection);
  // };

  // useEffect(() => {
  //   sections.current = document.querySelectorAll('[data-section]');
  //   window.addEventListener('scroll', handleScroll);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  //establish InteractionObserver for signaling when each section is in view
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
        setActive(visibleSection.children[0].id)
        
      }
    });

    //Get custom attribute data-section from all sections
    const sections = document.querySelectorAll("[data-section]");

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

  // spring config for scroll progress bar
   const scaleX = useSpring(scrollYProgress, {
     stiffness: 100,
     damping: 30,
     restDelta: 0.001,
   });

  return (
    <>
      <nav
        className={`paddingX w-full flex items-center py-5 fixed top-0 bg-primary drop-shadow-md z-30`}
      >
        <div className="w-full flex justify-between items-center max-w-7xl mx-auto ">
          <Link
            to="/"
            className="flex items-center gap-4 z-20"
            onClick={() => {
              setActive("");
              window.scrollTo(0, 0);
            }}
          >
            <img src={logo} alt="" className="w-9 h-9 object-contain" />
            <div className="text-white-100 text-[18px] font-semibold cursor-pointer flex items-center justify-center z-20 gap-2 tracking-wide">
              <p>esgoet</p>
              <p className="sm:block hidden">|</p>
              <p className="sm:block hidden">Creative Developer</p>
            </div>
          </Link>
          <ol className="list-none hidden sm:flex flex-row gap-10">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.id ? "text-white-100" : "text-black-200"
                  
                }
              hover:text-white-100 text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(link.id)}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ol>
          <div className="sm:hidden flex flex-none justify-end items-center">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain cursor-pointer z-20"
              onClick={() => setToggle(!toggle)}
            />
          </div>
          <motion.div
            animate={{
              right: toggle ? 0 : -500,
              display: toggle ? "hidden" : "flex",
            }}
            transition={{ duration: 0.5, ease: easeIn }}
            className={`hidden py-3 px-6 mt-1 bg-black-200 absolute top-[78px] z-10 border-primary border-2 border-r-0 rounded-l-full overflow-x-hidden`}
          >
            <ol className="list-none flex flex-row items-end justify-end w-full gap-8">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`${
                    active === link.id ? "text-black-100" : "text-white-100"
                  } font-roboto font-medium cursor-pointer text-[18px]`}
                  onClick={() => {
                    setActive(link.id);
                    setToggle(!toggle);
                  }}
                >
                  <a href={`#${link.id}`}>{link.title}</a>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </nav>
      <motion.div
        style={{ scaleX }}
        className={`fixed h-[5px] w-full top-[75px] bg-white z-20 origin-[0%]`}
      />
    </>
  );
}

export default Navbar