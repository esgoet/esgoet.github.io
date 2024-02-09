import React, {useState} from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { codesymbol, filtersymbol, leftarrow, rightarrow } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { e } from 'maath/dist/index-43782085.esm';

// get all tags from all projects and sort them alphabetically
const tags = [];
const tagTypes = [];

projects.map((project) =>
  project.tags.map((tag) => {
    if (!tags.find((el) => el.name === tag.name)) {
      tags.push({...tag, weight: 1} );
    } else {
      tags.find((el) => el.name === tag.name).weight +=1;

    }
  })
);


tags.sort((a,b)=>(a.name > b.name));
tags.sort((a, b) => a.weight - b.weight);
tags.reverse();


// tags.map((tag)=> {
//   if (!tagTypes.find((el) => el === tag.type)) {
//     tagTypes.push(tag.type);
//   }
// })

// tagTypes.sort((a, b) => a.name > b.name);

tagTypes.push("device", "platform", "language", "library", "software")


const ProjectTag = ({name, type, size, onClick, filterType, weight}) => {
  const fontSize = `text-[${size}px]`;
  const smallerFont = `text-[${size-2}px]`;

  const Weight = () => (
    <span
      className={`ml-1 -mr-1 py-0.5 px-1.5 rounded-full bg-black-100 ${smallerFont}`}
    >
      {weight}
    </span>
  );
  if (type === filterType) {
     return (
       <>
         <label
           htmlFor={name}
           className={`${fontSize} bg-black-300 px-2 text-white-100 rounded-full`}
         >
           <input
             type={"checkbox"}
             className="hidden"
             id={name}
             onClick={onClick}
           />
           <span className="hover:text-white-100">#</span>
           <span className="hover:text-secondary">{name}</span>
           {weight > 1 ? <Weight/> : null}
         </label>
       </>
     );

  }
  return
 
}



const ProjectCard = (
    {index, name, description, tags, image, source_code_link}
) => {
  const [tasksToggled, setTasksToggled] = useState(false)
  return (
    <>
      {/* <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}> */}
      <Tilt
        options={{ max: 5, scale: 1, speed: 450 }}
        className="sm:flex-none  sm:w-[320px] flex flex-col justify-between snap-center sm:snap-align-none"
      >
        <div className="p-5 bg-primary border-2 border-black-100/80 rounded-t-2xl h-full">
          <div className="relative w-full h-[150px] ">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-2xl border-2 border-black-100/80"
            />
            <div className="absolute inset-0 flex justify-end m-2 card-img_hover">
              <a
                href={source_code_link}
                target="_blank"
                rel="external"
                className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer drop-shadow-md bg-black-100/70 hover:bg-black-300 font-bold text-[18px] align-middle text-center"
              >{`</>`}</a>
              {/* <div
                onClick={() => window.open(source_code_link, "_blank")}
                className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer drop-shadow-md bg-black-300/50 hover:bg-black-300"
              >
                
                <p className="font-bold text-[18px]">{`</>`}</p>
              </div> */}
            </div>
          </div>

          <div className="mt-3">
            <h3 className="text-black-100 font-bold text-[20px]">{name}</h3>
            <p className="text-black-200 leading-[20px] text-[14px] text-justify">
              {description}
            </p>
          </div>
        </div>

        <div
          className={`flex flex-wrap justify-end gap-1 w-full bg-black-100/50 p-3 rounded-b-2xl`}
        >
          {tags.map((tag) => (
            <p
              key={tag.name}
              className={`text-[12px] px-2 text-white-100 rounded-full`}
            >
              #{tag.name}
            </p>
          ))}
        </div>

        {/* 
        <div
          onClick={() => setTasksToggled(!tasksToggled)}
          className="w-5 h-5 rounded-full flex justify-center items-center cursor-pointer drop-shadow-md bg-black-300/90 hover:bg-black-200"
        >
          <p className="text-center align-center">{tasksToggled ? "-" : "+"}</p>
        </div> */}
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

  const resetFilter = () => {
    setCurrentProjects(projects);
    document.querySelectorAll("input[type='checkbox']:checked")
      .forEach((tag) => {
        tag.checked = false
        tag.parentNode.style.backgroundColor = "#7E57C2";
        tag.nextSibling.innerHTML = "#";
      }
        );
    //   // get a list of all checked tags
    // const checkedTags = [];
    // document
    //   .querySelectorAll("input[type='checkbox']:checked")
    //   .forEach((tag) => checkedTags.push(tag.id));

    // // if none of input type checkbox are checked, reset filter
    // if (!checkedTags.length === 0) {

    // setCurrentProjects(projects);
    // }
  }

  const filterProjects = () => {
    const filteredProjects = [];

    // get a list of all checked tags
    const checkedTags = [];
    document
      .querySelectorAll("input[type='checkbox']:checked")
      .forEach((tag) => checkedTags.push(tag.id));

    // if none of input type checkbox are checked, reset filter
    if (checkedTags.length === 0) {
      setCurrentProjects(projects);
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

  //hard-coded scroll rn, should be automated based on number of projects

  const scrollGallery = (e) => {
    const gallery = document.getElementById('projectGallery');
    const direction = e.target.id;
    if (gallery != null) {
      const currentScroll = gallery.scrollLeft;



      if (direction === 'right') {
          gallery.scrollTo(currentScroll + 350, 0);
          if (currentScroll === 0 ){
                    document.getElementById(
                      "left"
                    ).parentElement.style.opacity = 1;
                        document.getElementById("left").style.cursor = "pointer";

          } else if (currentScroll + 350 === 700) {
                    document.getElementById(
                      "right"
                    ).parentElement.style.opacity = 0.2;
                        document.getElementById("right").style.cursor = "not-allowed";
          }
      } else {
           if (currentScroll === 340) {
             document.getElementById("left").parentElement.style.opacity = 0.2;
                 document.getElementById("left").style.cursor = "not-allowed";
           } else if (currentScroll === 690) {
            document.getElementById("right").parentElement.style.opacity = 1;
              document.getElementById(
                "right"
              ).style.cursor = 'pointer';
            
           }
          gallery.scrollTo(currentScroll - 350, 0);

     

      }    

    }
    

    console.log('scrolling ' + direction)
  }

  return (
    <>
      <motion.div variants={textVariant()}>
        {/* <div> */}
        <p className={styles.sectionSubText}>My portfolio</p>
        <h2 className={styles.sectionHeadText}>Projects.</h2>
        {/* </div> */}
      </motion.div>
      <div className="sm:snap-center xl:snap-none">
        <form
          id="filterTagsForm"
          className="my-4 bg-black-100/50 p-4 rounded-2xl flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-row items-center px-2">
              <img
                src={filtersymbol}
                alt=""
                className="w-[26px] h-[26px] object-contain cursor-pointer z-20"
              ></img>
              <h3 className="px-2 text-[18px]">Filter Projects</h3>
            </div>

            <button
              className="bg-black-100 px-3 text-white-100 rounded-full"
              type="button"
              onClick={resetFilter}
            >
              RESET
            </button>
          </div>

          <div className="flex sm:flex-row flex-col gap-2 max-w-full overflow-x-scroll">
            {tagTypes.map((type) => (
              <fieldset
                className="flex flex-wrap items-start justify-start gap-1 rounded-2xl bg-black-100 p-2"
                id={type}
                key={type}
              >
                <legend className="text-center text-tertiary text-[14px]">
                  {type.toUpperCase()}
                </legend>
                {tags.map((tag) => (
                  <ProjectTag
                    key={tag.name}
                    {...tag}
                    size={14}
                    onClick={checkTag}
                    filterType={type}
                    weight={tag.weight}
                  />
                ))}
              </fieldset>
            ))}
          </div>
        </form>
        <div className="flex sm:flex-row items-center justify-center gap-2">
          <div className="hidden sm:flex justify-center items-center w-[5%] opacity-20">
            <img
              src={leftarrow}
              alt=""
              className="w-full h-full  object-contain cursor-pointer"
              id="left"
              onClick={scrollGallery}
            />
          </div>

          <div
            className="flex flex-wrap sm:flex-nowrap sm:overflow-hidden gap-7 justify-start w-full sm:w-[90%]"
            id="projectGallery"
          >
            {currentProjects.map((project) => (
              <ProjectCard key={project.name} {...project} />
            ))}
          </div>
          <div className="hidden sm:flex justify-center items-center w-[5%] opacity-100">
            <img
              src={rightarrow}
              alt=""
              className="w-full h-full object-contain cursor-pointer"
              onClick={scrollGallery}
              id="right"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionWrapper(Works,'work')