import {projects} from "../constants/index.js";
import {filtersymbol} from "../assets/index.js";
import ProjectTag from "./ProjectTag.jsx";

export default function ProjectsFilterForm({setCurrentProjects, resetGalleryScroll}) {
    const tagTypes = ["device", "platform", "language", "library", "software"];
    const tags = [];

    projects.forEach((project) =>
        project.tags.forEach((tag) => {
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

    const filterProjects = () => {
        const checkedTags = [];
        document
            .querySelectorAll("input[type='checkbox']:checked")
            .forEach((tag) => checkedTags.push(tag.id));

        if (checkedTags.length === 0) {
            resetFilter();
        } else {
            const filteredProjects = projects
                .filter((project) =>
                    project.tags.some((tag) =>
                        checkedTags.includes(tag.name)));
            setCurrentProjects(filteredProjects);
            resetGalleryScroll(filteredProjects);
        }
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

        resetGalleryScroll(projects);
    }

    return (
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
    );
};