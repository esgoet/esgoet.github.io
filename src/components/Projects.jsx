import { useState, useRef} from 'react';
import { motion } from 'framer-motion';


import { filtersymbol, leftarrow, rightarrow } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { textVariant } from '../utils/motion';
import ProjectCard from './ProjectCard';
import ProjectTag from './ProjectTag';


const Projects = () => {
  const [currentProjects, setCurrentProjects] = useState(projects);
  // hooks and variables to track and handle scrolling
  const [visibilityIndex, setVisibilityIndex] = useState(0);
  const galleryRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);  
  // isMobile comes up as undefined, so querying window directly again?
  const displayCount = window.matchMedia("(max-width: 500px)").matches ? 1 : 3;

  // categories for technologies used
  const tagTypes = ["device", "platform", "language", "library", "software"];
  // get all tags (technologies used) from all projects and sort them alphabetically
  const tags = [];

  projects.map((project) =>
    project.tags.map((tag) => {
      //if the tag is not already in the new tags array, add it
      if (!tags.find((el) => el.name === tag.name)) {
        tags.push({...tag, weight: 1} );
      } else {
        // add weight to them if they are already in the list to indicate there is more than one project using that technology
        tags.find((el) => el.name === tag.name).weight +=1;
      }
    })
  );
  tags.sort((a,b)=>(a.name > b.name));
  tags.sort((a, b) => a.weight - b.weight);
  tags.reverse();


  // functions to handle scrolling left and right in project gallery
  const toggleArrow = (arrow, enable) => {
    // if arrow (ref.current) is defined
    if (arrow) {
      // make sure arrow is useable/deactivated based on boolean enable
      if (enable) {
        arrow.parentElement.style.opacity = 1;
        arrow.style.cursor = 'pointer';
      } else {
        arrow.parentElement.style.opacity = 0.2;
        arrow.style.cursor = 'not-allowed';
      }
    }
  }

  const handlePrev = () => {
    // if we can still scroll left (tracked with visibility Index)
    if (visibilityIndex > 0) {
      // decrease index of visible projects to track how far left we can scroll
      setVisibilityIndex((prev) => prev - 1)

      // make sure that the right arrow is now useable if scrolling right was not possible before
      toggleArrow(nextRef.current, true)

      // if scrolling left is no longer possible after scrolling left once more
      if (visibilityIndex === 1 && prevRef.current) {
        // deactivate left arrow to scroll left
        toggleArrow(prevRef.current, false)
      } 

      // scroll so that the previous project in line is visible
      if (galleryRef.current) {
        galleryRef.current.scrollTo({
          left: galleryRef.current.scrollLeft - galleryRef.current.clientWidth/displayCount,
          behavior: 'smooth',
        });
      }
    }
  }

  const handleNext = () => {
    // if the index of the visible projects is smaller than the number of all current projects
    if (visibilityIndex + displayCount < currentProjects.length) {
      // then increase index of visible projects to track how far we can scroll right
      setVisibilityIndex((prev) => prev +1)

      // make sure that the left arrow is now useable if scrolling left was not possible before
      toggleArrow(prevRef.current, true)

      // if scrolling right is no longer possible after scrolling right once more
      if (visibilityIndex + displayCount + 1 === currentProjects.length && nextRef.current) {
        // deactivate right arrow 
        toggleArrow(nextRef.current, false)
      } 

      // scroll so that the next project is visible
      if (galleryRef.current) {
        galleryRef.current.scrollTo({
          left: galleryRef.current.scrollLeft + galleryRef.current.clientWidth/displayCount,
          behavior: 'smooth',
        });
      }
    }
  }

    // functions to handle filter system
    const checkTag = (e) => {
      // change look of tag based on whether tag is checked or unchecked
      if (e.target.checked) {
        e.target.parentNode.style.backgroundColor = "#5a65fc";
        e.target.nextSibling.innerHTML = `&#x00D7; #`;
      } else {
        e.target.parentNode.style.backgroundColor = "#6200EA";
        e.target.nextSibling.innerHTML = "#";
      }
      // filter projects based on checked tags
      filterProjects();
    };
  
    const resetFilter = () => {
      setCurrentProjects(projects);
  
      // make sure all checked filter options are no longer checked
      document.querySelectorAll("input[type='checkbox']:checked")
        .forEach((tag) => {
          tag.checked = false
          tag.parentNode.style.backgroundColor = "#6200EA";
          tag.nextSibling.innerHTML = "#";
        }
          );
  
      // reset visibility index to track scrolling accurately again
      setVisibilityIndex(0);
      // make sure right arrow is useable
      toggleArrow(nextRef.current, true)
      // make sure left arrow is disabled
      toggleArrow(prevRef.current, false)

      // scroll all the way to the left again
      if (galleryRef.current) {
        galleryRef.current.scrollTo({
          left: 0,
          behavior: 'smooth',
        });
      }
    }
  
    const filterProjects = () => {
      // create new projects array to manipulate
      const filteredProjects = [];
  
      // get a list of all checked tags
      const checkedTags = [];
      document
        .querySelectorAll("input[type='checkbox']:checked")
        .forEach((tag) => checkedTags.push(tag.id));
  
      // if none of input type checkbox are checked, reset filter
      if (checkedTags.length === 0) {
        resetFilter();
      } else {
        // clear filtered project list
        filteredProjects.length = 0;
        // if one of the tags checked is present for the project
        projects.forEach((project) => {
          project.tags.forEach((projectTag) => {
            if (checkedTags.includes(projectTag.name)) {
              // if project is not already included in new projects array
              if (
                !filteredProjects.find(
                  (filteredProject) => filteredProject.name === project.name
                )
              ) {
                // add project to new projects array
                filteredProjects.push({...project});
              }
            }
          });
          
        });
      
        setCurrentProjects(filteredProjects);
  
         // reset visibility index to track scrolling accurately again
        setVisibilityIndex(0)
        
        // check if there are less projects (filtered or not) than can be displayed at once
        if (filteredProjects.length <= displayCount) {
          // if yes, deactivate right arrow since no scrolling right necessary
          toggleArrow(nextRef.current, false)
        } else {
          // if no, make sure right arrow is useable for scrolling right
          toggleArrow(nextRef.current, true)
        }
  
        // scroll all the way to the left again
        if (galleryRef.current) {
          galleryRef.current.scrollTo({
            left: 0,
            behavior: 'smooth',
          });
        }
      }
  
     
    };
  

  return (
    <>
      <motion.div variants={textVariant()} className='2xl:place-self-start'>
        <p className="sectionSubText">My portfolio</p>
        <h2 className="sectionHeadText">Projects.</h2>
      </motion.div>
      <div className="sm:snap-center 2xl:snap-align-none">
        {/*  filter form to filter projects based on technologies used */}
        <form
          id="filterTagsForm"
          className="my-4 bg-black-100/50  p-4 rounded-2xl flex flex-col gap-2"
        >
          <div className="flex justify-between items-center">
            <div className="flex flex-row items-center px-2">
              <img
                src={filtersymbol}
                alt=""
                className="w-[26px] h-[26px] object-contain"
              ></img>
              <h3 className="px-2 text-[18px]">Filter Projects</h3>
            </div>
            {/* reset button to clear all filters */}
            <button
              className="bg-black-100 px-3 text-white-100 rounded-full"
              type="button"
              onClick={resetFilter}
            >
              RESET
            </button>
          </div>
          <div className="flex sm:flex-row flex-col gap-2 max-w-full overflow-x-auto">
            {/* display all technologies used categorised by type and sorted after weight (# of times used) */}
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
        {/* project gallery to showcase projects */}
        <div className="flex flex-wrap sm:flex-nowrap sm:flex-row items-center justify-center gap-2">
          {/* arrow to scroll left through projects on click */}
        <div className={`flex place-items-center size-10 sm:size-14 opacity-20`}>
          <button
              onClick={handlePrev}
              ref={prevRef}
              className="w-full h-full"
          >
            <img
                src={leftarrow}
                className="w-full h-full object-contain p-1"

            />
          </button>
        </div>
          {/* display all or the currently filtered projects with arrows left and right on the side or below (mobile) to scroll through projects */}
          <div
              ref={galleryRef}
            className={`flex overflow-hidden w-full order-first sm:-order-none sm:w-[90%] snap-center`}
            id="projectGallery"
          >
            {currentProjects.map((project, index) => (      
              <ProjectCard key={project.name} index={index} visibilityIndex={visibilityIndex} displayCount={displayCount} {...project} />        
            ))
            }
            {/* add an empty div if there are less than 3 filtered projects so that the distribution stays even */}
            {currentProjects.length < displayCount && <div className='w-1/3'/>}
          </div>
           {/* arrow to scroll right through projects on click */}
          <div className={`flex place-items-center size-10 sm:size-14 `}>
            <button
                ref={nextRef}
                onClick={handleNext}
                className="w-full h-full"
            >
              <img
                  src={rightarrow}
                  className="w-full h-full object-contain p-1"
              />
            </button>
          </div>
        </div>
        {/* dot indicators to show many projects there are and which are visible */}
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