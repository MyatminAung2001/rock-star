"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { RotatingLines } from "react-loader-spinner";

import { getPublishersDetails, getPublishersGames } from "@/services/service.publishers";
import GameCard from "@/components/GameCard";

const PublishersGames = () => {

    const { slug } = useParams();

    const { ref, inView } = useInView();

    const { isLoading, isError, data: publishersDetail } = useQuery("publishers-detail", () => getPublishersDetails(slug));

    const [page, setPage] = useState(1);

    const { data: publishersGames, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery(
        "publishers-games",
        ({ pageParam = 1 }) => getPublishersGames(slug, pageParam),
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

    const gamesData = publishersGames?.pages.flatMap((page) => page);

    const formatted = gamesData?.map((d) => d.results);

    const realData = gamesData ? [].concat(...formatted) : [];

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
                    Published By {publishersDetail?.name}
                </p>
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

export default PublishersGames;
