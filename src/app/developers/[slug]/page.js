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
        isFetchingNextPage
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

export default DevelopersGames;
