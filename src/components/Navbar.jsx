import React, {useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {styles} from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import { useSpring, animated } from '@react-spring/web';


const Navbar = () => {
  const [active, setActive] = useState('')
  const [toggle, setToggle] = useState(false)


   const { y } = useSpring({
     from: { y: 60 },
     y: toggle ? 75 : 60,
     config: { duration: 300 },
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
                  active === link.title ? "text-white" : "text-secondary"
                }
              hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(link.title)}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
          </ul>
          <div className="sm:hidden flex flex-none justify-end items-center">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[28px] h-[28px] object-contain cursor-pointe z-20"
              onClick={() => setToggle(!toggle)}
            />
          </div>
        </div>
        <animated.div
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
        </animated.div>
      </nav>
    </>
  );
}

export default Navbar