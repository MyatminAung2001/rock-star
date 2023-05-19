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

    const { data: developersDetail } = useQuery({
        queryKey: ["developers-detail"],
        queryFn: () => getDevelopersDetails(slug),
    });

    const {
        data: developersGames,
        isError,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isFetching,
    } = useInfiniteQuery({
        queryKey: ["developers-games"],
        queryFn: ({ pageParam = 1 }) => getDevelopersGames({ slug, pageParam }),
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

    const gamesData = (developersGames?.pages || []).flatMap(
        (page) => page.results || []
    );
    const formattedData = gamesData || [];

    return {
        ref,
        isLoading,
        isError,
        developersDetail,
        formattedData,
        isFetchingNextPage,
        isFetching,
    };
};

export default useContainer;
