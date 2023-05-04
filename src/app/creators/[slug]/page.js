"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { RotatingLines } from "react-loader-spinner";

import { getCreatorsDetails, getCreatorsGames } from "@/services/service.creator";
import GameCard from "@/components/GameCard";

const CreatorsDetail = () => {

    const { slug } = useParams();

    const { ref, inView } = useInView();

    const { isLoading, isError, data: creatorsDetail } = useQuery("creators-detail", () => getCreatorsDetails(slug));

    const [page, setPage] = useState(1);

    const { data: creatorsGames, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery(
        "creators-games",
        ({ pageParam = 1 }) => getCreatorsGames(slug, pageParam),
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

    const gamesData = creatorsGames?.pages.flatMap((page) => page);

    const formatted = gamesData?.map((d) => d.results);

    const realData = gamesData ? [].concat(...formatted) : [];

    // content
    // remove p tag from a string
    const myString = creatorsDetail?.description;
    const description = myString?.replaceAll(/<\/?[^>]+(>|$)/gi, "");

    if (isLoading) {
        return (
            <div className="w-[100%] h-screen flex items-center justify-center"> 
                <RotatingLines
                    strokeColor="#B7B5B3"
                    strokeWidth="2"
                    animationDuration="0.75"
                    width="50"
                    visible={true}
                />
            </div>
        )
    };

    return (
        <div className="default-section-padding">
            <span style={{
                content: "",
                backgroundImage: `
                    linear-gradient(rgba(21, 21, 21, 0), rgb(21, 21, 21)),
                    linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)),
                    url(${creatorsDetail.image_background})
                `,
                backgroundSize: "cover",
                backgroundPosition: "top",
                backgroundColor: "transparent",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                zIndex: "-10",
                inset: "0",
                height: "500px",
                maxHeight: "100%"
            }} />
            <div className="mb-5">
                <div className="flex flex-col items-center lg:items-start">
                    {creatorsDetail?.image && (
                        <Image 
                            src={creatorsDetail.image}
                            alt={creatorsDetail?.name}
                            width={90}
                            height={90}
                            className="rounded-full mb-5"
                        />
                    )}
                    <p className="heading mb-2">
                        {creatorsDetail?.name}
                    </p>    
                    {creatorsDetail?.positions && (
                        <div className="flex items-center justify-center gap-x-2 mb-5">
                            {creatorsDetail?.positions.map((data, i, arr) => (
                                <p key={data.id} className="text-white text-lg first-letter:uppercase font-light">
                                    {data.name}{i != arr.length - 1 ? ", " : " "}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
                <p className="text-primary-white text-[14px] lg:text-[16px] font-light">
                    {description}
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {realData?.map((data) => (
                    <div key={data.id} ref={ref}>
                        <GameCard data={data} />
                    </div>
                ))}
                <div className="w-[100%] flex items-center justify-center">
                    {isFetching && !isFetchingNextPage ? (
                        <RotatingLines
                            strokeColor="#B7B5B3"
                            strokeWidth="2"
                            animationDuration="0.75"
                            width="50"
                            visible={true}
                        />
                    ) : (
                        null
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreatorsDetail;
