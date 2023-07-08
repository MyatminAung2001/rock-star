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

    const query = useQuery({
        queryKey: ["creators-detail", slug],
        queryFn: () => getCreatorsDetails(slug),
    });

    const infiniteQuery = useInfiniteQuery({
        queryKey: ["creator-games", slug],
        queryFn: ({ pageParam = 1 }) => getCreatorsGames({ slug, pageParam }),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.next === null) return undefined;
            return allPages.length + 1;
        },
        keepPreviousData: true,
    });

    // for loading
    const isLoading = query.isLoading || infiniteQuery.isLoading;

    // for error
    const isError = query.isError || infiniteQuery.isError;

    // useInfiniteQuery
    const fetchNextPage = infiniteQuery.fetchNextPage;
    const hasNextPage = infiniteQuery.hasNextPage;
    const isFetchingNextPage = infiniteQuery.isFetchingNextPage;

    // access data
    const creatorsDetail = query.data;
    const creatorsRelatedGames = infiniteQuery.data;

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    const gamesData = (creatorsRelatedGames?.pages || []).flatMap(
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
        description,
        formattedData,
    };
};

export default useContainer;
