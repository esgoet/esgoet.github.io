const ProjectTag = ({name, size, onClick, weight, isSelected}) => {
    const fontSize = `text-[${size}px]`;
    const smallerFont = `text-[${size - 2}px]`;
    const backgroundColor = isSelected ? 'bg-blue-500' : 'bg-black-300';
    const textSymbol = isSelected ? `× #` : '#';

    return (
        <div className={`${fontSize} ${backgroundColor} flex flex-nowrap flex-row bg-black-300 px-2 py-1 text-white-100 rounded-full`}>
            <label
                htmlFor={name}
                className={`contents cursor-pointer`}
            >
                <input
                    type={"checkbox"}
                    className="hidden"
                    id={name}
                    onChange={onClick}
                    checked={isSelected}
                />
                <span className="hover:text-white-100">{textSymbol}</span>
                <span className="hover:text-secondary">{name}</span>
                {/* how many projects use this tech? = weight */}
                {weight > 1 &&
                    <span
                        className={`ml-1 -mr-1 mb-0.5 px-1.5 rounded-full bg-black-100 ${smallerFont}`}
                    >
                    {weight}
                </span>
                }
            </label>
        </div>
    );
}

export default ProjectTag;
  