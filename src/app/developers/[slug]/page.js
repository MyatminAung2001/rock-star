"use client";

import { RotatingLines } from "react-loader-spinner";

import GameCard from "@/components/GameCard";
import useDevelopers from "./hook";

const DevelopersGames = () => {

    const {
        ref,
        isLoading,
        isError,
        developersDetail,
        realData,
        isFetchingNextPage,
        isFetching
    } = useDevelopers();

    if (isLoading) {
        return (
            <div className="w-[100%] flex items-center justify-center">
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
                    Developed By {developersDetail?.name}
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {realData?.map((data) => (
                    <div key={data.id} ref={ref}>
                        <GameCard data={data} />
                    </div>
                ))}
                {isFetching && !isFetchingNextPage ? (
                    <div className="w-[100%] flex items-center justify-center">
                        <RotatingLines
                            strokeColor="#B7B5B3"
                            strokeWidth="2"
                            animationDuration="0.75"
                            width="50"
                            visible={true}
                        />
                    </div>
                ) : (
                    null
                )}
            </div>
        </div>
    );
};

export default DevelopersGames;
