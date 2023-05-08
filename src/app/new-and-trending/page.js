"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { RotatingLines } from "react-loader-spinner";

import { getNewAndTrending } from "@/services/service.games";
import GameCard from "@/components/Common/GameCard";

const Page = () => {
  const router = useRouter();

  const { ref, inView } = useInView();

  const [page, setPage] = useState(1);

  const {
    data: NewAndTrending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
    isError,
  } = useInfiniteQuery(
    "new-and-trending",
    ({ pageParam = 1 }) => getNewAndTrending(pageParam),
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

  const gamesData = NewAndTrending?.pages.flatMap((page) => page);

  const formatted = gamesData?.map((d) => d.results);

  const realData = gamesData ? [].concat(...formatted) : [];

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
    );
  }

  return (
    <div className="px-4 py-12 lg:py-4">
      <p className="heading mb-3">New and trending</p>
      <p className="text-primary-white mb-3">
        Based on player counts and rating
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {realData?.map((data) => (
          <div
            key={data.id}
            ref={ref}
            onClick={() => router.push(`games/${data.slug}`)}
          >
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

export default Page;
