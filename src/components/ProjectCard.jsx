import { useState } from 'react';
import { Tilt } from 'react-tilt';

const ProjectCard = (
    {index, visibilityIndex, displayCount, name, description, tags, image, source_code_link}
) => {
    const [showFullSize, setShowFullSize ] = useState(false);
  return (
    <>
      <Tilt
        options={{ max: 5, scale: 1, speed: 450 }}
        className={`${index >= visibilityIndex && index < visibilityIndex + displayCount ? 'opacity-100' : 'opacity-0'} transition duration-300 ease-in flex flex-none w-full sm:w-1/3 px-2 flex-col justify-between snap-center sm:snap-align-none`}
      >
        <div className="p-5 bg-primary border-2 border-black-100/80 rounded-t-2xl h-full">
          <div className="relative w-full h-[150px] ">
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover rounded-lg border-2 border-black-100/80 cursor-pointer"
              onClick={()=>setShowFullSize(!showFullSize)}
            />
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
      <div 
        className={`${showFullSize ? 'flex z-50' : 'hidden'}  fixed cursor-pointer top-0 left-0 place-items-center place-content-center w-screen h-screen backdrop-blur-md`}
        onClick={() => setShowFullSize(!showFullSize)}
      >
        <div className='relative flex place-content-center w-5/6'>
        <img src={image} alt={name} className='w-full rounded-2xl drop-shadow-md cursor-auto'/>
       

              <div
              onClick={() => setShowFullSize(!showFullSize)}
                 className="absolute top-4 right-4 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer drop-shadow-md bg-black-100/70 hover:bg-black-300 font-bold text-[18px] align-middle text-center"
              >{`X`}</div>

        </div>
        
      </div>
    </>
  );
}

export default ProjectCard;