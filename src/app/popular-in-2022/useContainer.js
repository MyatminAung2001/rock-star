import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { getPopularIn2022 } from "@/services/service.games";

const useContainer = () => {
    const { ref, inView } = useInView();

    const {
        data: PopularIn2022,
        isError,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["popular-in-2022"],
        queryFn: ({ pageParam = 1 }) => getPopularIn2022(pageParam),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.next === null) return undefined;
            return allPages.length + 1;
        },
        keepPreviousData: true,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const gamesData = (PopularIn2022?.pages || []).flatMap(
        (page) => page.results || []
    );
    const formattedData = gamesData || [];

    return {
        ref,
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        formattedData,
    };
};

export default useContainer;
