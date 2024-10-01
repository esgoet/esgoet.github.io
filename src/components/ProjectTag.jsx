const ProjectTag = ({name, type, size, onClick, filterType, weight}) => {
    const fontSize = `text-[${size}px]`;
    const smallerFont = `text-[${size-2}px]`;


    if (type === filterType) {
       return (
         <div className={`${fontSize} flex flex-nowrap flex-row bg-black-300 px-2 py-1 text-white-100 rounded-full`}>
           <label
             htmlFor={name}
             className={` contents`}
           >
             <input
               type={"checkbox"}
               className="hidden"
               id={name}
               onClick={onClick}
             />
             <span className="hover:text-white-100">#</span>
             <span className="hover:text-secondary">{name}</span>
             {/* how many projects use this tech? = weight */}
             {weight > 1 ? <span
                    className={`ml-1 -mr-1 py-0.5 px-1.5 rounded-full bg-black-100 ${smallerFont}`}
                >
                    {weight}
                </span>: null}
           </label>
         </div>
       );
  
    }
    return
   
  }

  export default ProjectTag;
  