import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  webvr,
  vrautism,
  portfolio,
  threejs,
  bearopedia,
  turtlefractalgenerator
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  // {
  //   name: "TypeScript",
  //   icon: typescript,
  // },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  // {
  //   name: "figma",
  //   icon: figma,
  // },
  {
    name: "Swift",
    icon: docker,
  },
  {
    name: "Python",
    icon: docker,
  },
  {
    name: "C#",
    icon: docker,
  },
];

const experiences = [
  {
    title: "Demonstrator in Computer Science",
    company_name: "UCC",
    icon: starbucks,
    iconBg: "#383E56",
    date: "June 2022 - April 2023",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Research Internship",
    company_name: "Universiteit Leiden",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const projects = [
  {
    name: "VR as an Autism Awareness Tool",
    description:
      "VR application that allows users to experience autistic symptoms from a first-person perspective in a health care setting to improve empathy and care for autistic patients.",
    tags: [
      {
        name: "VR",
        color: "blue-text-gradient",
      },
      {
        name: "C#",
        color: "green-text-gradient",
      },
      {
        name: "Unity",
        color: "pink-text-gradient",
      },
      {
        name: "Blender",
        color: "pink-text-gradient",
      },
    ],
    image: vrautism,
    source_code_link: "https://github.com/",
    filtered: false,
  },
  {
    name: "Interactive 3D Portfolio",
    description:
      "Web portfolio that enables users to interact with a 3D environment.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "threejs",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "Blender",
        color: "pink-text-gradient",
      },
      {
        name: "Web",
        color: "pink-text-gradient",
      },
    ],
    image: portfolio,
    source_code_link: "https://github.com/esgoet/esgoet.github.io",
    filtered: false,
  },
  {
    name: "Interactive VR Web Application",
    description:
      "Web application built with Three.JS with which users can experience a 3D scene in VR given the appropriate hardware.",
    tags: [
      {
        name: "VR",
        color: "blue-text-gradient",
      },
      {
        name: "threejs",
        color: "green-text-gradient",
      },
      {
        name: "Web",
        color: "pink-text-gradient",
      },
      {
        name: "Blender",
        color: "pink-text-gradient",
      },
    ],
    image: webvr,
    source_code_link: "https://github.com/esgoet/threejs-vr-app",
    filtered: false,
  },
  {
    name: "Bearopedia",
    description:
      "A mobile encyclopedic application that enables the user to explore facts about different bear species and favourite or edit their favourite species",
    tags: [
      {
        name: "iOS",
        color: "blue-text-gradient",
      },
      {
        name: "Swift",
        color: "green-text-gradient",
      },
      {
        name: "CoreData",
        color: "pink-text-gradient",
      },
      {
        name: "Mobile",
        color: "pink-text-gradient",
      },
    ],
    image: bearopedia,
    source_code_link: "https://github.com/esgoet/bearopedia",
    filtered: false,
  },
  {
    name: "Turtle Fractal Generator",
    description:
      "A simple desktop python application with which various fractals can be drawn based on user settings",
    tags: [
      {
        name: "Python",
        color: "blue-text-gradient",
      },
      {
        name: "Tkinter",
        color: "pink-text-gradient",
      },
      {
        name: "Desktop",
        color: "pink-text-gradient",
      },
    ],
    image: turtlefractalgenerator,
    source_code_link: "https://github.com/esgoet/turtle-fractal-generator",
    filtered: false,
  },
];

export { technologies, experiences, projects };
