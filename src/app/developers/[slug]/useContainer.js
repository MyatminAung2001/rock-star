import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import {
    getDevelopersDetails,
    getDevelopersGames,
} from "@/services/service.developers";

const useContainer = () => {
    const { slug } = useParams();

    const { ref, inView } = useInView();

    const query = useQuery({
        queryKey: ["developers-detail", slug],
        queryFn: () => getDevelopersDetails(slug),
    });

    const infiniteQuery = useInfiniteQuery({
        queryKey: ["developers-games", slug],
        queryFn: ({ pageParam = 1 }) => getDevelopersGames({ slug, pageParam }),
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
    const developersDetail = query.data;
    const developersRelatedGames = infiniteQuery.data;

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const gamesData = (developersRelatedGames?.pages || []).flatMap(
        (page) => page.results || []
    );
    const formattedData = gamesData || [];

    return {
        ref,
        isError,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        developersDetail,
        formattedData,
    };
};

export default useContainer;
