"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { RotatingLines } from "react-loader-spinner";

import { getTagsGames, getTagsDetails } from "@/services/service.tags";
import GameCard from "@/components/Common/GameCard";

const TagsGames = () => {
  const { slug } = useParams();

  const { ref, inView } = useInView();

  const {
    isLoading,
    isError,
    data: tagsDetail,
  } = useQuery("tags-detail", () => getTagsDetails(slug));

  const [page, setPage] = useState(1);

  const {
    data: tagGames,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfiniteQuery(
    "tags-games",
    ({ pageParam = 1 }) => getTagsGames(slug, pageParam),
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

  const gamesData = tagGames?.pages.flatMap((page) => page);

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
    );
  }

  return (
    <div className="default-section-padding">
      <div className="mb-5">
        <p className="heading mb-5">{tagsDetail?.name} Games</p>
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

export default TagsGames;
