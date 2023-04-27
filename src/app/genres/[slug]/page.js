"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { getGenresDetails, getGenresGames } from "@/services/services.genres";

const GenreDetails = () => {

    const { slug } = useParams();

    const { ref, inView } = useInView();

    const { isLoading, isError, data: genreDetails } = useQuery(["genres-detail", slug], () => getGenresDetails(slug));

    const [page, setPage] = useState(1);

    const { data: genresGames, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        ["genres-games", slug],
        ({ pageParam = 1 }) => getGenresGames(slug, pageParam),
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
            setPage(page + 1)
        }
    }, [inView, hasNextPage, isFetchingNextPage, page, fetchNextPage])

    const gamesData = genresGames?.pages.flatMap(page => page);

    const formatted = gamesData?.map(d => d.results)

    const realData = gamesData
        ? [].concat(...formatted)
        : [];

    console.log("real-data", realData);

    // content
    // remove p tag from a string
    const myString = genreDetails?.description;
    const description = myString?.replace(/<p>|<\/p>/gi, '');

    // control read more state
    const [showFullContent, setShowFullContent] = useState(false);

    const cutOff = 165;

    const displayContent = description?.length <= cutOff || showFullContent 
        ? description 
        : `${description?.substring(0, cutOff)}`;

    return (
        <div className="default-section-padding">
            <div className="mb-5">
                <p className="heading mb-5">
                    {genreDetails?.name} Games
                </p>
                <p className="text-primary-white text-[16px] font-light">
                    {displayContent}... {" "}
                    {!showFullContent && description?.length > cutOff && (
                        <button 
                            onClick={() => setShowFullContent(true)}
                            className="text-[12px] bg-primary-bg-white text-primary-bg-black px-2 rounded"
                        >
                            read more
                        </button>
                    )}
                </p>
            </div>
            <div className="grid grid-cols-1 gap-y-5 xl:grid-cols-4">
                {realData?.map((data) => (
                    <div key={data.id} ref={ref} className="bg-[#212529] rounded-xl">
                        <LazyLoadImage 
                            src={data.background_image}
                            alt={data.name}
                            effect="blur"
                            threshold={50}
                            className="object-cover w-[100%] h-[230px] rounded-t-xl"
                        />
                        <div className="py-2 px-4">
                            <div className="w-[100%] flex items-start justify-between">
                                <p className="text-primary-white text-xl font-semibold w-[220px]">
                                    {data.name}
                                </p>
                                <p className="px-2 rounded mt-1 text-sm text-primary-yellow border border-primary-bg-yellow">
                                    {data.metacritic}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
                {isFetchingNextPage && <p className="text-primary-white">Fetching more posts...</p>}
            </div>
        </div>
    );
}

export default GenreDetails;