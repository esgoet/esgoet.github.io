import { useState } from 'react';
import { Tilt } from 'react-tilt';

const ProjectCard = (
    {index, visibilityIndex, displayCount, name, description, tags, image, source_code_link}
) => {
    const [showFullSizeImg, setShowFullSizeImg ] = useState(false);

  return (
    <>
  {/* project card that becomes visible with a transition if scrolled into view */}
      <Tilt
        options={{ max: 5, scale: 1, speed: 450 }}
        className={`${index >= visibilityIndex && index < visibilityIndex + displayCount ? 'opacity-100' : 'opacity-0'} transition duration-300 ease-in flex flex-none w-full sm:w-1/3 px-2 flex-col justify-between snap-center sm:snap-align-none`}
      >
        <div className="p-5 bg-primary border-2 border-black-100/80 rounded-t-2xl h-full">
          <div className="relative w-full h-[150px] ">
            {/* project thumbnail img */}
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-lg border-2 border-black-100/80 cursor-pointer"
              onClick={()=>setShowFullSizeImg(!showFullSizeImg)}
            />
            {/* project code on github */}
            <div className="absolute top-0 right-0 flex justify-end m-2">
              <a
                href={source_code_link}
                target="_blank"
                rel="external"
                className="w-10 h-10 rounded-full flex justify-center items-center cursor-pointer drop-shadow-md bg-black-100/70 hover:bg-black-300 font-bold text-[18px] align-middle text-center"
              >{`</>`}</a>
            </div>
          </div>

          <div className="mt-3">
            {/* project name */}
            <h3 className="text-black-100 font-bold text-[20px]">{name}</h3>
            {/* project description */}
            <p className="text-black-200 leading-[20px] text-[14px] text-justify">
              {description}
            </p>
          </div>
        </div>

        <div
          className={`flex flex-wrap justify-end gap-1 w-full bg-black-100/50 p-3 rounded-b-2xl`}
        >
        {/* technologies used in project */}
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
      {/* full size project img with modal pop up when clicking on thumbnail img */}
      <div 
        className={`${showFullSizeImg ? 'flex z-50' : 'hidden'}  fixed cursor-pointer top-0 left-0 place-items-center place-content-center w-screen h-screen backdrop-blur-md`}
        onClick={() => setShowFullSizeImg(!showFullSizeImg)}
      >
        <div className='relative flex place-content-center w-5/6'>
        <img src={image} alt={name} className='w-full rounded-2xl drop-shadow-md cursor-auto'/>
       

              <div
              onClick={() => setShowFullSizeImg(!showFullSizeImg)}
                 className="absolute top-4 right-4 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer drop-shadow-md bg-black-100/70 hover:bg-black-300 font-bold text-[18px] align-middle text-center"
              >{`X`}</div>

        </div>
        
      </div>
    </>
  );
}

export default ProjectCard;