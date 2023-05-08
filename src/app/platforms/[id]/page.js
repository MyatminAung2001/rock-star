"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { RotatingLines } from "react-loader-spinner";

import {
  getPlatformsDetails,
  getPlatformsGames,
} from "@/services/service.platform";
import GameCard from "@/components/common/GameCard";

const PlatformsGames = () => {
  const { id } = useParams();

  const { ref, inView } = useInView();

  const {
    isLoading,
    isError,
    data: platformsDetail,
  } = useQuery("platforms-detail", () => getPlatformsDetails(id));

  const [page, setPage] = useState(1);

  const {
    data: platformsGames,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery(
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

  const gamesData = platformsGames?.pages.flatMap((page) => page);

  const formatted = gamesData?.map((d) => d.results);

  const realData = gamesData ? [].concat(...formatted) : [];

  // content
  // remove p tag from a string
  const myString = platformsDetail?.description;
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
    );
  }

  return (
    <div className="default-section-padding">
      <div className="mb-5">
        <p className="heading mb-5">{platformsDetail?.name} Games</p>
        {platformsDetail?.description && (
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
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
        ) : null}
      </div>
    </div>
  );
};

export default PlatformsGames;
