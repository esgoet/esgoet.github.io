import {forwardRef} from "react";

const GalleryArrow = forwardRef(function GalleryArrow({svg, onClick, direction, disabled}, ref) {
    return (
        <div className={`flex place-items-center size-10 sm:size-14 ${disabled && "opacity-20"}`}>
            <button
                onClick={onClick}
                ref={ref}
                className={`w-full h-full ${disabled && "cursor-not-allowed"}`}
            >
                <img
                    src={svg}
                    className="w-full h-full object-contain p-1"
                    alt={`arrow pointing ${direction}`}
                />
            </button>
        </div>
    );
});

export default GalleryArrow;