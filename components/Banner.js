
import { useState } from "react";
import Swipe from "react-easy-swipe";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export default function Banner({ banners }) {

    const [currentSlide, setCurrentSlide] = useState(0);

    const handleNextSlide = () => {
        let newSlide = currentSlide === banners.length - 1 ? 0 : currentSlide + 1;
        setCurrentSlide(newSlide);
    };

    const handlePrevSlide = () => {
        let newSlide = currentSlide === 0 ? banners.length - 1 : currentSlide - 1;
        setCurrentSlide(newSlide);
    };

    return (
        <div className="relative bg-slate-300 aspect-[3/1]" >

            <div className="w-full h-full flex overflow-hidden relative m-auto">
                <Swipe
                    onSwipeLeft={handleNextSlide}
                    onSwipeRight={handlePrevSlide}
                    className="relative z-10 w-full h-full"
                >
                    {banners.map((banner, index) => {
                        if (index === currentSlide) {
                            return (
                                <img
                                    key={banner.id}
                                    alt={banner.alt}
                                    src={banner.imgUrl}
                                    className="animate-fadeIn w-full h-full"
                                />
                            );
                        }
                    })}
                </Swipe>
            </div>


            {/* 左邊按鈕 */}
            <AiOutlineLeft
                onClick={handlePrevSlide}
                className="absolute left-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-10"
            />

            {/* 右邊按鈕 */}
            <AiOutlineRight
                onClick={handleNextSlide}
                className="absolute right-0 m-auto text-5xl inset-y-1/2 cursor-pointer text-gray-400 z-10"
            />

            {/* 點 */}
            <div className="absolute left-0 right-0 bottom-0 flex justify-center p-2 z-10">
                {banners.map((_, index) => {
                    return (
                        <div
                            className={
                                index === currentSlide
                                    ? "h-4 w-4 bg-gray-700 rounded-full mx-2 mb-2 cursor-pointer"
                                    : "h-4 w-4 bg-gray-300 rounded-full mx-2 mb-2 cursor-pointer"
                            }
                            key={index}
                            onClick={() => {
                                setCurrentSlide(index);
                            }}
                        />
                    );
                })}
            </div>

        </div>
    );
}

