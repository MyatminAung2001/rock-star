"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { TailSpin } from "react-loader-spinner";

import { getPlatformsDetails, getPlatformsGames } from "@/services/service.platform";
import GameCard from "@/components/GameCard";

const PlatformsGames = () => {

    const { id } = useParams();

    const { ref, inView } = useInView();

    const { isLoading, isError, data: platformDetails } = useQuery("platforms-detail", () => getPlatformsDetails(id));

    const [page, setPage] = useState(1);

    const { data: platformGames, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        "platforms-games",
        ({ pageParam = 1 }) => getPlatformsGames(id, pageParam),
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

    const gamesData = platformGames?.pages.flatMap((page) => page);

    const formatted = gamesData?.map((d) => d.results);

    const realData = gamesData ? [].concat(...formatted) : [];

    // content
    // remove p tag from a string
    const myString = platformDetails?.description;
    const description = myString?.replace(/<p>|<\/p>/gi, "");

    // control read more state
    const [showFullContent, setShowFullContent] = useState(false);

    const cutOff = 165;

    const displayContent =
        description?.length <= cutOff || showFullContent
        ? description
        : `${description?.substring(0, cutOff)}`;

    return (
        <div className="default-section-padding">
            <div className="mb-5">
                <p className="heading mb-5">
                    {platformDetails?.name} Games
                </p>
                {platformDetails?.description && (
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
                {isFetchingNextPage && (
                    <div className="w-[100%] flex items-center justify-center">
                        <TailSpin
                            height="60"
                            width="60"
                            color="#212529"
                            ariaLabel="tail-spin-loading"
                            radius="1"
                            visible={true}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PlatformsGames;
