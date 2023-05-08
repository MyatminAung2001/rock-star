"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { RotatingLines } from "react-loader-spinner";

import { getPublishers } from "@/services/service.publishers";
import { PublishIcon } from "@/components/Common/icons/PublishIcon";
import Card from "@/components/Common/Card";

const Publishers = () => {
  const router = useRouter();

  const { ref, inView } = useInView();

  const [page, setPage] = useState(1);

  const {
    data: publishers,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
    isError,
  } = useInfiniteQuery(
    "publishers",
    ({ pageParam = 1 }) => getPublishers(pageParam),
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

  const gamesData = publishers?.pages.flatMap((page) => page);

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
    <div className="default-section-padding w-[100%]">
      <div className="flex items-center justify-center lg:justify-start gap-x-2 mb-5">
        <div className="lg:hidden">
          <PublishIcon />
        </div>
        <header className="heading">Publishers</header>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {realData?.map((data) => (
          <div
            key={data.id}
            ref={ref}
            onClick={() => router.push(`publishers/${data.id}`)}
          >
            <Card data={data} />
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

export default Publishers;
