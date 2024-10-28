import {projects} from "../../constants/index.js";
import {filtersymbol} from "../../assets/index.js";
import ProjectTag from "./ProjectTag.jsx";
import {useCallback, useEffect, useMemo, useState} from "react";

export default function ProjectsFilterForm({setCurrentProjects, resetGalleryScroll}) {
    const tagTypes = ["device", "platform", "language", "library", "software"];
    const [selectedTags, setSelectedTags] = useState(new Set());

    const tags = useMemo(() => {
        const tagMap = new Map();

        projects.forEach(project => {
            project.tags.forEach(tag => {
                if (!tagMap.has(tag.name)) {
                    tagMap.set(tag.name, { ...tag, weight: 1 });
                } else {
                    tagMap.get(tag.name).weight += 1;
                }
            });
        });
        return Array.from(tagMap.values()).sort((a, b) => b.weight - a.weight || a.name.localeCompare(b.name));
    }, [projects]);

    const toggleTag = useCallback((tagName) => {
        setSelectedTags(prevSelected => {
            const updatedTags = new Set(prevSelected);
            updatedTags.has(tagName) ? updatedTags.delete(tagName) : updatedTags.add(tagName);
            return updatedTags;
        });
    }, []);

    const filteredProjects = useMemo(() => {
        if (selectedTags.size === 0) return projects;
        return projects.filter(project =>
            project.tags.some(tag => selectedTags.has(tag.name))
        );
    }, [selectedTags, projects]);


    const applyFilter = useCallback(() => {
        setCurrentProjects(filteredProjects);
        resetGalleryScroll(filteredProjects);
    }, [filteredProjects, setCurrentProjects, resetGalleryScroll]);

    const resetFilter = useCallback(() => {
        setSelectedTags(new Set());
    }, [setSelectedTags]);


    useEffect(() => {
        applyFilter();
    }, [selectedTags, applyFilter]);

    return (
        <form
            id="filterTagsForm"
            className="my-4 bg-black-100/50 p-4 rounded-2xl flex flex-col gap-2"
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
                        className="flex flex-wrap items-start justify-start content-start gap-1 rounded-2xl bg-black-100 p-2"
                        id={type}
                        key={type}
                    >
                        <legend className="text-center text-tertiary text-[14px] w-full">
                            {type.toUpperCase()}
                        </legend>
                        {tags.filter(tag => tag.type === type).map((tag) => (
                            <ProjectTag
                                key={tag.name}
                                {...tag}
                                size={14}
                                onClick={()=> toggleTag(tag.name)}
                                isSelected={selectedTags.has(tag.name)}
                            />
                        ))}
                    </fieldset>
                ))}
            </div>
        </form>
    );
};