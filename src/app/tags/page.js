"use client"

import { useState, useEffect } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { TailSpin } from "react-loader-spinner";

import { getTags } from "@/services/service.tags";
import TagIcon from "@/assets/icons/TagIcon";
import Card from "@/components/Card";

const Tags = () => {

    const { ref, inView } = useInView();

    const [page, setPage] = useState(1);

    const { data: tags, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        "tags",
        ({ pageParam = 1 }) => getTags(pageParam),
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

    const gamesData = tags?.pages.flatMap((page) => page);

    const formatted = gamesData?.map((d) => d.results);

    const realData = gamesData ? [].concat(...formatted) : [];

    console.log(realData);

    return (
        <div className="default-section-padding w-[100%]">
            <div className="flex items-center justify-center gap-x-2 mb-5">
                <TagIcon />
                <header className="heading">
                    Tags
                </header>
            </div>
            <div className="grid grid-cols-1 gap-y-5">
                {realData?.map((data) => (
                    <div key={data.id} ref={ref} onClick={() => router.push(`tags/${data.id}`)}>
                        <Card data={data} />
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
}

export default Tags;