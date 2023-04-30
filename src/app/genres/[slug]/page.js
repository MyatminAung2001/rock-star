"use client";

import { RotatingLines } from "react-loader-spinner";

import GameCard from "@/components/GameCard";
import useGenres from "./hook";

const GenreGames = () => {

    const {
        ref,
        isLoading,
        isError,
        genresDetail,
        showFullContent,
        setShowFullContent,
        displayContent,
        description,
        cutOff,
        isFetchingNextPage,
        realData
    } = useGenres();

    if (isLoading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center"> 
                <RotatingLines
                    strokeColor="#B7B5B3"
                    strokeWidth="2"
                    animationDuration="0.75"
                    width="50"
                    visible={true}
                />
            </div>
        )
    }

    return (
        <div className="default-section-padding">
            <div className="mb-5">
                <p className="heading mb-5">
                    {genresDetail?.name} Games
                </p>
                <p className="text-primary-white text-[16px] font-light">
                    {displayContent}...{" "}
                    {!showFullContent && description?.length > cutOff && (
                        <button
                            onClick={() => setShowFullContent(true)}
                            className="text-[12px] bg-primary-bg-white text-primary-bg-black px-2 rounded"
                        >
                            read more
                        </button>
                    )}
                </p>
            </div>
            <div className="grid grid-cols-1 gap-y-5 xl:grid-cols-4">
                {realData?.map((data) => (
                    <div key={data.id} ref={ref}>
                        <GameCard data={data} />
                    </div>
                ))}
                {isFetchingNextPage && (
                    <div className="w-[100%] flex items-center justify-center">
                        <RotatingLines
                            strokeColor="#B7B5B3"
                            strokeWidth="2"
                            animationDuration="0.75"
                            width="50"
                            visible={true}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default GenreGames;
