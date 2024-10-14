import ProjectCard from "./ProjectCard.jsx";
import {forwardRef} from "react";

const ProjectGallery = forwardRef(function ProjectGallery({currentProjects, visibilityIndex, displayCount}, ref) {
    return (
        <div
            ref={ref}
            className={`flex overflow-hidden w-full order-first sm:-order-none sm:w-[90%] snap-center`}
            id="projectGallery"
        >
            {currentProjects.map((project, index) => (
                <ProjectCard key={project.name} index={index} visibilityIndex={visibilityIndex}
                             displayCount={displayCount} {...project} />
            ))
            }
            {/* add an empty div if there are less than 3 filtered projects so that the distribution stays even */}
            {currentProjects.length < displayCount && <div className='w-1/3'/>}
        </div>
    );
});

export default ProjectGallery;