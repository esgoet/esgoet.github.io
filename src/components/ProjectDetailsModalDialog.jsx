import {useEffect, useRef} from "react";

export default function ProjectDetailsModalDialog({modal, setModal, image, name, video, hasVideo}) {
    const dialogRef = useRef();
    const videoRef = useRef();

    useEffect(() => {
        if (modal) {
            dialogRef.current?.showModal();
        } else {
            dialogRef.current?.close();
        }
    }, [modal]);

    return (
        <dialog
            ref={dialogRef}
            className={`fixed m-auto rounded-2xl flex place-content-center w-5/6 backdrop:backdrop-blur-md`}
            onClose={() => {
                setModal(false);
                videoRef.current?.pause();
            }}
        >
            {(hasVideo && video) ?
                <video
                    ref={videoRef}
                    src={video}
                    className='w-full z-40 rounded-2xl drop-shadow-md cursor-auto'
                    onClick={(e) => e.stopPropagation()}
                    controls
                >
                    Sorry, your browser does not support embedded videos.
                </video>
                :
                <img
                    src={image}
                    alt={name}
                    className='w-full rounded-2xl drop-shadow-md cursor-auto'
                    // onClick={(e) => e.stopPropagation()}
                />
            }
          <button
              autoFocus
              onClick={() => {
                        setModal(false);
                        videoRef.current?.pause();
                    }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex justify-center items-center cursor-pointer drop-shadow-md bg-black-100/70 hover:bg-black-300 font-bold text-[18px] align-middle text-center"
          >
                {`X`}
            </button>
        </dialog>
    );
}