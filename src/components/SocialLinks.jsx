import { linkedin, github, email } from "../assets";

const SocialLinks = () => (
  <div className="flex flex-row gap-5 items-center justify-center">
    <a
      href="https://linkedin.com/in/eva-goetzke"
      target="_blank"
      rel="noreferrer"
      className="w-6 h-6 flex justify-center items-center cursor-pointer drop-shadow-md"
    >
      <img
        src={linkedin}
        alt="linkedin"
        className="w-full h-full object-contain"
      />
    </a>
    <a
      href="https://github.com/esgoet"
      target="_blank"
      rel="noreferrer"
      className="w-7 h-7 flex justify-center items-center cursor-pointer drop-shadow-md"
    >
      <img src={github} alt="github" className="w-full h-full object-contain" />
    </a>
    <a
      href="#contact"
      className="w-7 h-7 flex justify-center items-center cursor-pointer drop-shadow-md"
    >
      <img src={email} alt="Email" className="w-full h-full object-contain" />
    </a>
  </div>
);

export default SocialLinks;