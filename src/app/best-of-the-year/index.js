"use client";

import GameCard from "@/components/Common/GameCard";
import { FetchingNextPage, Loading } from "@/components/Common/Loading";
import useContainer from "./useContainer";

const BestOfTheYear = () => {
    const {
        ref,
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        formattedData,
    } = useContainer();

    if (isLoading) return <Loading />;

    if (isError) return <p>Error...</p>;

    return (
        <div className="default-section-padding">
            <p className="heading mb-3">Best Of The Year</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {formattedData?.map((data) => (
                    <GameCard key={data.id} data={data} />
                ))}
            </div>

            <div ref={ref}>
                {hasNextPage ? (
                    isFetchingNextPage && <FetchingNextPage />
                ) : (
                    <p className="text-white text-center mt-3">
                        No More Results
                    </p>
                )}
            </div>
        </div>
    );
};

export default BestOfTheYear;
