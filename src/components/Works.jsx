import React, {useState} from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { codesymbol } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

// get all tags from all projects and sort them alphabetically
const tags = [];

projects.map((project) =>
  project.tags.map((tag) => {
    if (!tags.find((e) => e.name === tag.name)) {
      tags.push(tag);
    }
  })
);

tags.sort((a,b)=>(a.name > b.name));



const ProjectTag = ({name, color, size, onClick}) => {
  const fontSize = `text-[${size}px]`;
  const smallerFont = `text-[${size-4}px]`;
  return (
    <>
      <label
        htmlFor={name}
        className={`${fontSize} bg-black-100 px-2 text-white rounded-full `}
      >
        <input
          type={"checkbox"}
          className="hidden"
          id={name}
          onClick={onClick}
        />
        <span className="hover:text-white">#</span>
        <span className="hover:text-secondary">{name}</span>
      </label>
    </>
  );
}



const ProjectCard = (
    {index, name, description, tags, image, source_code_link}
) => {
  return (
    <>
      {/* <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}> */}
      <Tilt
        options={{ max: 5, scale: 1, speed: 450 }}
        className="bg-primary p-5 rounded-2xl sm:w-[360px] w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover rounded-2xl"
          />
          <div className="absolute inset-0 flex justify-end m-3 card-img_hover">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer drop-shadow-md bg-black-200/50 hover:bg-black-200"
            >
              {/* <img
                src={codesymbol}
                alt="code"
                className="w-full h-full object-contain"
              /> */}
              <p className="font-bold text-[18px]">{`</>`}</p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="text-black-100 text-[14px]">{description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <p
              key={tag.name}
              className={`text-[12px] bg-black-100 px-2 text-white rounded-full`}
            >
              #{tag.name}
            </p>

            // <ProjectTag key={tag.name} {...tag} size={12} onClick={""} />
          ))}
        </div>
      </Tilt>
      {/* </motion.div> */}
    </>
  );
}


const Works = () => {
  const [currentProjects, setCurrentProjects] = useState(projects);


  const checkTag = (e) => {
    if (e.target.checked) {
      e.target.parentNode.style.backgroundColor = "#bb99ff";
      e.target.nextSibling.innerHTML = `&#x00D7; #`;
    } else {
      e.target.parentNode.style.backgroundColor = "#7E57C2";
      e.target.nextSibling.innerHTML = "#";
    }
    filterProjects();
  };

  const filterProjects = () => {
    const filteredProjects = [];

    // get a list of all checked tags
    const checkedTags = [];
    document
      .querySelectorAll("input[type='checkbox']:checked")
      .forEach((tag) => checkedTags.push(tag.id));

    // if none of input type checkbox are checked, reset filter
    if (checkedTags.length === 0) {
      setCurrentProjects(projects)
    } else {
      // copy a project from projects into new list
      // clear filtered project list
      filteredProjects.length = 0;
      // if one of the tags checked is present for the project
      projects.forEach((project) => {
        project.tags.forEach((projectTag) => {
          if (checkedTags.includes(projectTag.name)) {
            if (
              !filteredProjects.find(
                (filteredProject) => filteredProject.name === project.name
              )
            ) {
              filteredProjects.push({...project});
            }
          }
        });
        
      });
    
    setCurrentProjects(filteredProjects);
    }
  };

  return (
    <>
      {/* <motion.div variants={textVariant()}>
        {" "} */}
      <div>
        <p className={styles.sectionSubText}>My work</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
      </div>
      {/* </motion.div> */}
      <div className="w-full flex">
        {/* <motion.p
          variants={fadeIn("", "", 0.1, 0.1)}
          className="mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]"
        > */}
        <p>
          Following projects showcases my skills and experiences through
          real-world examples of my work.
        </p>

        {/* </motion.p> */}
      </div>
      <div className="mt-4 mr-4 mb-0 flex flex-wrap gap-2 bg-black-200/50 p-8 rounded-2xl">
        {tags.map((tag) => (
          <ProjectTag key={tag.name} {...tag} size={16} onClick={checkTag} />
        ))}
      </div>

      <div className="mt-20 flex flex-wrap gap-7" id="projectGallery">
        {currentProjects.map((project) => (
          <ProjectCard key={project.name} {...project} />
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(Works,'work')