"use client"

import { useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { RotatingLines } from "react-loader-spinner";

import { GENRES, PLATFORMS, STORES, TAGS, DEVELOPERS, PUBLISHERS, CREATORS } from '@/constants/locationPathname';
import { getGames } from "@/services/service.games";
import GameCard from "@/components/GameCard";

const Page = () => {

    const router = useRouter();

    const { ref, inView } = useInView();

    const [page, setPage] = useState(1);

    const { data: games, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching, isLoading, isError } = useInfiniteQuery(
        "games",
        ({ pageParam = 1 }) => getGames(pageParam),
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

    const gamesData = games?.pages.flatMap((page) => page);

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
        <div className="p-4 flex">
            {/* <aside className="hidden lg:block lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:bg-slate-700 lg:p-4 lg:w-60">
                <div className="pt-16 px-8">
                    <header className="text-sub-heading font-semibold tracking-wider">
                        Browse
                    </header>
                    <div className="mt-3 flex flex-col gap-y-3">
                        <p onClick={() => {
                            router.push(GENRES);
                            
                        }} className="cursor-pointer">
                            Genres
                        </p>
                        <p onClick={() => {
                            router.push(PLATFORMS);
                        
                        }} className="cursor-pointer">
                            Platforms
                        </p>
                        <p onClick={() => {
                            router.push(STORES);
                            
                        }} className="cursor-pointer">
                            Stores
                        </p>
                        <p onClick={() => {
                            router.push(TAGS);
                            
                        }} className="cursor-pointer">
                            Tags
                        </p>
                        <p onClick={() => {
                            router.push(DEVELOPERS);
                            
                        }} className="cursor-pointer">
                            Developers
                        </p>
                        <p onClick={() => {
                            router.push(PUBLISHERS);
                        
                        }} className="cursor-pointer">
                            Publishers
                        </p>
                        <p onClick={() => {
                            router.push(CREATORS);
                            
                        }} className="cursor-pointer">
                            Creators
                        </p>
                    </div>
                </div>
            </aside> */}
            <div className="">
                <p className="heading">
                    New and trending
                </p>
                <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                    {realData?.map((data) => (
                        <div key={data.id} ref={ref} onClick={() => router.push(`creators/${data.id}`)}>
                            <GameCard data={data} />
                        </div>
                    ))}
                    {isFetching && isFetchingNextPage ? (
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
        </div>
    );
}

export default Page;