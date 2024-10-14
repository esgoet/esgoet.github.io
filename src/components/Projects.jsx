import { useState, useRef} from 'react';
import { motion } from 'framer-motion';
import { leftarrow, rightarrow } from '../assets';
import { SectionWrapper } from '../hoc';
import { projects } from '../constants';
import { textVariant } from '../utils/motion';
import ProjectsFilterForm from "./ProjectsFilterForm.jsx";
import GalleryArrow from "./GalleryArrow.jsx";
import ProjectGallery from "./ProjectGallery.jsx";
import GalleryScrollIndicator from "./GalleryScrollIndicator.jsx";


const Projects = () => {
  const [currentProjects, setCurrentProjects] = useState(projects);
  // hooks and variables to track and handle scrolling
  const [visibilityIndex, setVisibilityIndex] = useState(0);
  const galleryRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const displayCount = window.matchMedia("(max-width: 500px)").matches ? 1 : 3;

  const toggleArrow = (arrow, enable) => {
    if (arrow) {
      if (enable) {
        arrow.parentElement.style.opacity = 1;
        arrow.style.cursor = 'pointer';
      } else {
        arrow.parentElement.style.opacity = 0.2;
        arrow.style.cursor = 'not-allowed';
      }
    }
  }

  const scrollGallery = (scrollLeft) => {
    if (galleryRef.current) {
      galleryRef.current.scrollTo({
        left: scrollLeft,
        behavior: 'smooth',
      });
    }
  }


  const handlePrev = () => {
    if (visibilityIndex > 0) {
      setVisibilityIndex((prev) => prev - 1);
      toggleArrow(nextRef.current, true);
      if (visibilityIndex === 1 && prevRef.current) {
        toggleArrow(prevRef.current, false);
      }
      scrollGallery(galleryRef.current.scrollLeft - galleryRef.current.clientWidth/displayCount);
    }
  }

  const handleNext = () => {
   if (visibilityIndex + displayCount < currentProjects.length) {
      setVisibilityIndex((prev) => prev +1);
      toggleArrow(prevRef.current, true);

      if (visibilityIndex + displayCount + 1 === currentProjects.length && nextRef.current) {
        toggleArrow(nextRef.current, false)
      }
      scrollGallery(galleryRef.current.scrollLeft + galleryRef.current.clientWidth/displayCount);
    }
  }

  const resetGalleryScroll = (filteredProjects) => {
    setVisibilityIndex(0)
    if (filteredProjects.length <= displayCount) {
      toggleArrow(nextRef.current, false)
    } else {
      toggleArrow(nextRef.current, true)
    }
    toggleArrow(prevRef.current, false)
    scrollGallery(0);
  }

  return (
    <>
      <motion.div variants={textVariant()} className='2xl:place-self-start'>
        <p className="sectionSubText">My portfolio</p>
        <h2 className="sectionHeadText">Projects.</h2>
      </motion.div>
      <div className="sm:snap-center 2xl:snap-align-none">
        <ProjectsFilterForm resetGalleryScroll={resetGalleryScroll} setCurrentProjects={setCurrentProjects}/>
        <div className="flex flex-wrap sm:flex-nowrap sm:flex-row items-center justify-center gap-2">
          <GalleryArrow ref={prevRef} onClick={handlePrev} svg={leftarrow} disabled={true}/>
          <ProjectGallery ref={galleryRef} currentProjects={currentProjects} displayCount={displayCount} visibilityIndex={visibilityIndex}/>
          <GalleryArrow ref={nextRef} onClick={handleNext} svg={rightarrow}/>
        </div>
        <GalleryScrollIndicator currentProjects={currentProjects} displayCount={displayCount} visibilityIndex={visibilityIndex}/>
      </div>
    </>
  );
}

export default SectionWrapper(Projects,'projects')