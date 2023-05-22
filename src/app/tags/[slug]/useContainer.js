import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { getTagsGames, getTagsDetails } from "@/services/service.tags";

const useContainer = () => {
    const { slug } = useParams();

    const { ref, inView } = useInView();

    const { data: tagsDetail } = useQuery({
        queryKey: ["tags-detail", slug],
        queryFn: () => getTagsDetails(slug),
    });

    const {
        data: tagGames,
        isError,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["tags-games", slug],
        queryFn: ({ pageParam = 1 }) => getTagsGames({ slug, pageParam }),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length === 0) return undefined;
            return allPages.length + 1;
        },
        keepPreviousData: true,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const gamesData = (tagGames?.pages || []).flatMap(
        (page) => page.results || []
    );
    const formattedData = gamesData || [];

    return {
        ref,
        isLoading,
        isError,
        tagsDetail,
        isFetchingNextPage,
        formattedData,
    };
};

export default useContainer;
