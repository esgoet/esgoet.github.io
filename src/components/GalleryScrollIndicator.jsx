export default function GalleryScrollIndicator({currentProjects, visibilityIndex, displayCount}) {
    return (
        <div className='flex place-items-center place-content-center gap-2 mt-4'>
            {currentProjects.map((project, index) => (
                <span key={`dot_${project.name}`}
                      className={`w-2 h-2 rounded-full ${index >= visibilityIndex && index < visibilityIndex + displayCount ? 'bg-white' : 'bg-secondary/40'}`}/>
            ))}
        </div>
    );
};