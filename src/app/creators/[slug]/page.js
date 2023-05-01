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

    const { data: creatorsGames, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
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
    };

    console.log(creatorsDetail);

    return (
        <div className="default-section-padding">
            <span style={{
                content: "",
                backgroundImage: `
                    linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%), 
                    url(${creatorsDetail.image_background})
                `,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "transparent",
                position: "absolute",
                zIndex: "-10",
                inset: "0",
                height: "500px"
            }}/>
            <div className="mb-5">
                <div className="flex flex-col items-center">
                    {creatorsDetail?.image && (
                        <Image 
                            src={creatorsDetail.image}
                            alt={creatorsDetail?.name}
                            width={90}
                            height={90}
                            className="rounded-full mb-5"
                        />
                    )}
                    <p className="heading">
                        {creatorsDetail?.name}
                    </p>    
                </div>
                {creatorsDetail?.positions && (
                    <div className="flex items-center justify-center gap-x-2 mb-5">
                        {creatorsDetail?.positions.map((data, i, arr) => (
                            <p key={data.id} className="text-white text-lg first-letter:uppercase font-light">
                                {data.name}{i != arr.length - 1 ? ", " : " "}
                            </p>
                        ))}
                    </div>
                )}
                <p className="text-primary-white text-[14px] font-light">
                    {description}
                </p>
            </div>
            <div className="grid grid-cols-1 gap-5 xl:grid-cols-4">
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

export default CreatorsDetail;
