"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { TailSpin } from "react-loader-spinner";

import { getDevelopersDetails, getDevelopersGames } from "@/services/service.developers";
import GameCard from "@/components/GameCard";

const DevelopersGames = () => {

    const { slug } = useParams();

    const { ref, inView } = useInView();

    const { isLoading, isError, data: tagDetails } = useQuery("developers-detail", () => getDevelopersDetails(slug));

    const [page, setPage] = useState(1);

    const { data: platformGames, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        "developers-games",
        ({ pageParam = 1 }) => getDevelopersGames(slug, pageParam),
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

    return (
        <div className="default-section-padding">
            <div className="mb-5">
                <p className="heading mb-5">
                    Developed By {tagDetails?.name}
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

export default DevelopersGames;
