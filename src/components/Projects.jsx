import { useState, useRef, useEffect} from 'react';
import { Tilt } from 'react-tilt';
import { motion } from 'framer-motion';

import { styles } from '../styles';
import { filtersymbol, leftarrow, rightarrow } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { textVariant } from '../utils/motion';
// import { e } from 'maath/dist/index-43782085.esm';

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
    {index, visibilityIndex, displayCount, name, description, tags, image, source_code_link}
) => {
  return (
    <>
      {/* <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}> */}
      <Tilt
        options={{ max: 5, scale: 1, speed: 450 }}
        className={`${index >= visibilityIndex && index < visibilityIndex + displayCount ? 'opacity-100' : 'opacity-0'} transition duration-300 ease-in flex sm:flex-none sm:w-1/3 px-2 h-[410px] flex-col justify-between snap-center sm:snap-align-none projectCard`}
      >
        <div className="p-5 bg-primary border-2 border-black-100/80 rounded-t-2xl h-full">
          <div className="relative w-full h-[150px] ">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-lg border-2 border-black-100/80"
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
      </Tilt>
      {/* </motion.div> */}
    </>
  );
}


const Projects = () => {
  const [currentProjects, setCurrentProjects] = useState(projects);
  const [visibilityIndex, setVisibilityIndex] = useState(0);
  const galleryRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);  
  const displayCount = 3

  useEffect(() => {
    if (galleryRef.current) {
      galleryRef.current.scrollLeft = 0;
    }
  }, [currentProjects]);

  const checkTag = (e) => {
    if (e.target.checked) {
      e.target.parentNode.style.backgroundColor = "#5a65fc";
      e.target.nextSibling.innerHTML = `&#x00D7; #`;
    } else {
      e.target.parentNode.style.backgroundColor = "#6200EA";
      e.target.nextSibling.innerHTML = "#";
    }
    filterProjects();
  };

  const resetFilter = () => {
    setCurrentProjects(projects);

    document.querySelectorAll("input[type='checkbox']:checked")
      .forEach((tag) => {
        tag.checked = false
        tag.parentNode.style.backgroundColor = "#6200EA";
        tag.nextSibling.innerHTML = "#";
      }
        );

    setVisibilityIndex(0);
    nextRef.current.parentElement.style.opacity = 1;
    nextRef.current.style.cursor = 'pointer';

    if (galleryRef.current) {
      galleryRef.current.scrollTo({
        left: 0,
        behavior: 'smooth',
      });
    }
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
      nextRef.current.parentElement.style.opacity = 1;
      nextRef.current.style.cursor = 'pointer';
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

    setVisibilityIndex(0)
    setCurrentProjects(filteredProjects);
    if (filteredProjects.length <= displayCount) {
        nextRef.current.parentElement.style.opacity = 0.2;
        nextRef.current.style.cursor = 'not-allowed';
    } else {
      nextRef.current.parentElement.style.opacity = 1;
      nextRef.current.style.cursor = 'pointer';
    }
    }
  };


  const handlePrev = () => {
    if (visibilityIndex > 0) {
      setVisibilityIndex((prev) => prev - 1)

      nextRef.current.parentElement.style.opacity = 1;
      nextRef.current.style.cursor = 'pointer';
      
      if (visibilityIndex === 1) {
        prevRef.current.parentElement.style.opacity = 0.2;
        prevRef.current.style.cursor = 'not-allowed';
      } 

      if (galleryRef.current) {
        galleryRef.current.scrollTo({
          left: galleryRef.current.scrollLeft - galleryRef.current.clientWidth/3,
          behavior: 'smooth',
        });
      }
    }
  }

  const handleNext = () => {
    if (visibilityIndex + 3 < currentProjects.length) {
      setVisibilityIndex((prev) => prev +1)

      prevRef.current.parentElement.style.opacity = 1;
      prevRef.current.style.cursor = 'pointer';
      
      if (visibilityIndex + displayCount + 1 === currentProjects.length) {
        nextRef.current.parentElement.style.opacity = 0.2;
        nextRef.current.style.cursor = 'not-allowed';
      } 

      if (galleryRef.current) {
        galleryRef.current.scrollTo({
          left: galleryRef.current.scrollLeft + galleryRef.current.clientWidth/3,
          behavior: 'smooth',
        });
      }
    }
  }

  

  return (
    <>
      <motion.div variants={textVariant()} className='2xl:place-self-start'>
        {/* <div> */}
        <p className="sectionSubText">My portfolio</p>
        <h2 className="sectionHeadText">Projects.</h2>
        {/* </div> */}
      </motion.div>
      <div className="sm:snap-center 2xl:snap-align-none">
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

          <div className="flex sm:flex-row flex-col gap-2 max-w-full overflow-x-auto">
            {tagTypes.map((type) => (
              <fieldset
                className="flex flex-wrap items-start justify-start  content-start gap-1 rounded-2xl bg-black-100 p-2"
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
              ref={prevRef}
              alt=""
              className="w-full h-full object-contain cursor-pointer p-1"
              id="left"
              onClick={handlePrev}
            />
          </div>

          <div
            ref={galleryRef}
            className={`flex flex-wrap sm:flex-nowrap sm:overflow-hidden w-full sm:w-[90%]`}
            id="projectGallery"
          >
            {currentProjects.map((project, index) => (      
              <ProjectCard key={project.name} index={index} visibilityIndex={visibilityIndex} displayCount={displayCount} {...project} />        
            ))
            }
            {currentProjects.length < displayCount && <div className='w-[320px] h-[410px]'/>}
          </div>
          <div className="hidden sm:flex justify-center items-center w-[5%] opacity-100">
            <img
              src={rightarrow}
              ref={nextRef}
              alt=""
              className="w-full h-full object-contain cursor-pointer p-1"
              onClick={handleNext}
              id="right"
            />
          </div>
         
        </div>
        <div className='flex place-items-center place-content-center gap-2 mt-4'>
            {currentProjects.map((project, index) => (
              <span key={`dot_${project.name}`} className={`w-2 h-2 rounded-full ${index >= visibilityIndex && index < visibilityIndex + displayCount ? 'bg-white' : 'bg-secondary/40'}`}/>
            ))}
          </div>
      </div>
    </>
  );
}

export default SectionWrapper(Projects,'projects')