"use client";

import GameCard from "@/components/Common/GameCard";
import { FetchingNextPage, Loading } from "@/components/Common/Loading";
import useContainer from "./useContainer";

const AllTimeTop250 = () => {

    const {
        router,
        ref,
        isLoading,
        isError,
        isFetchingNextPage,
        formattedData
    } = useContainer();

    if (isLoading) return <Loading />

    return (
        <div className="px-4 py-12 lg:py-4">
            <p className="heading mb-3">All time top 250</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {formattedData?.map((data) => (
                    <div
                        key={data.id}
                        ref={ref}
                        onClick={() => router.push(`games/${data.slug}`)}
                    >
                        <GameCard data={data} />
                    </div>
                ))}
            </div>
            {isFetchingNextPage && <FetchingNextPage />}
        </div>
    );
}

export default AllTimeTop250;