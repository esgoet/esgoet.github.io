const ProjectTag = ({name, type, size, onClick, filterType, weight}) => {
    const fontSize = `text-[${size}px]`;
    const smallerFont = `text-[${size-2}px]`;


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
             {weight > 1 ? <span
                    className={`ml-1 -mr-1 py-0.5 px-1.5 rounded-full bg-black-100 ${smallerFont}`}
                >
                    {weight}
                </span>: null}
           </label>
         </>
       );
  
    }
    return
   
  }

  export default ProjectTag;
  