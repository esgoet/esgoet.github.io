import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { styles } from "../styles";
import { navLinks } from "../constants";
import { linkedin, github, email } from "../assets";

import SocialLinks from "./SocialLinks";


const Footer = () => {
    const currentYear = new Date().getFullYear();
  return (
    <footer
      className={`w-full bg-black-100/50 flex flex-col gap-5 items-center justify-center sm:px-16 px-6 py-10 snap-center`}
    >
      <SocialLinks/>

      <small>&copy; {currentYear}, Eva Goetzke. All Rights Reserved</small>
    </footer>
  );
};

export default Footer;
