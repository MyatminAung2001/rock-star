import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import {
    getCreatorsDetails,
    getCreatorsGames,
} from "@/services/service.creator";

const useContainer = () => {
    const { slug } = useParams();

    const { ref, inView } = useInView();

    const { data: creatorsDetail } = useQuery({
        queryKey: ["creators-detail", slug],
        queryFn: () => getCreatorsDetails(slug),
    });

    const {
        data: creatorsGames,
        isError,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["creator-games", slug],
        queryFn: ({ pageParam = 1 }) => getCreatorsGames({ slug, pageParam }),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.next === null) return undefined;
            return allPages.length + 1;
        },
        keepPreviousData: true,
    });

    console.log("creators", creatorsGames);

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const gamesData = (creatorsGames?.pages || []).flatMap(
        (page) => page.results || []
    );
    const formattedData = gamesData || [];

    // content
    // remove p tag from a string
    const myString = creatorsDetail?.description;
    const description = myString?.replaceAll(/<\/?[^>]+(>|$)/gi, "");

    return {
        ref,
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        creatorsDetail,
        formattedData,
        description,
    };
};

export default useContainer;
