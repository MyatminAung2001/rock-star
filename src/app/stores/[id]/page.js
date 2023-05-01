"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { RotatingLines } from "react-loader-spinner";

import { getStoresDetails, getStoresGames } from "@/services/service.stores";
import GameCard from "@/components/GameCard";

const StoresGames = () => {

    const { id } = useParams();

    const { ref, inView } = useInView();

    const { isLoading, isError, data: storesDetail } = useQuery("stores-detail", () => getStoresDetails(id));

    const [page, setPage] = useState(1);

    const { data: storesGames, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery(
        "stores-games",
        ({ pageParam = 1 }) => getStoresGames(id, pageParam),
        {
        getNextPageParam: (lastPage) => {
            if (lastPage.length === 0) {
            return undefined;
            }
            return page + 1;
        },
        }
    );

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
            setPage(page + 1);
        }
    }, [inView, hasNextPage, isFetchingNextPage, page, fetchNextPage]);

    const gamesData = storesGames?.pages.flatMap((page) => page);

    const formatted = gamesData?.map((d) => d.results);

    const realData = gamesData ? [].concat(...formatted) : [];

    // content
    // remove p tag from a string
    const myString = storesDetail?.description;
    const description = myString?.replace(/<p>|<\/p>/gi, "");

    // control read more state
    const [showFullContent, setShowFullContent] = useState(false);

    const cutOff = 165;

    const displayContent =
        description?.length <= cutOff || showFullContent
        ? description
        : `${description?.substring(0, cutOff)}`;

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
                    {storesDetail?.name} Games
                </p>
                {storesDetail?.description && (
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
                )}
            </div>
            <div className="grid grid-cols-1 gap-y-5 xl:grid-cols-4">
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

export default StoresGames;
