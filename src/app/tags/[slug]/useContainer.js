import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { getTagsGames, getTagsDetails } from "@/services/service.tags";

const useContainer = () => {
    const { slug } = useParams();

    const { ref, inView } = useInView();

    const query = useQuery({
        queryKey: ["tags-detail", slug],
        queryFn: () => getTagsDetails(slug),
    });

    const infiniteQuery = useInfiniteQuery({
        queryKey: ["tags-games", slug],
        queryFn: ({ pageParam = 1 }) => getTagsGames({ slug, pageParam }),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length === 0) return undefined;
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
    const tagsDetails = query?.data;
    const tagsRelatedGames = infiniteQuery?.data;

    useEffect(() => {
        if (inView && hasNextPage && isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const gamesData = (tagsRelatedGames?.pages || []).flatMap(
        (page) => page.results || []
    );
    const formattedData = gamesData || [];

    return {
        ref,
        isLoading,
        isError,
        tagsDetails,
        formattedData,
        isFetchingNextPage,
    };
};

export default useContainer;
