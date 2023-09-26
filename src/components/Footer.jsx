import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { linkedin, github } from "../assets";


const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer
      className={`w-full bg-black-200/50 flex flex-col gap-5 items-center justify-center sm:px-16 px-6 py-10 -mt-10`}
    >
      <div className="flex flex-row gap-7 items-center justify-center">
        <div
          onClick={() =>
            window.open("https://linkedin.com/in/eva-goetzke", "_blank")
          }
          className="w-6 h-6 flex justify-center items-center cursor-pointer drop-shadow-md"
        >
          <img
            src={linkedin}
            alt="linkedin"
            className="w-full h-full object-contain"
          />
        </div>
        <div
          onClick={() => window.open("https://github.com/esgoet", "_blank")}
          className="w-7 h-7 flex justify-center items-center cursor-pointer drop-shadow-md"
        >
          <img
            src={github}
            alt="github"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      <small>&copy; {currentYear}, Eva Goetzke. All Rights Reserved</small>
    </footer>
  );
};

export default Footer;
