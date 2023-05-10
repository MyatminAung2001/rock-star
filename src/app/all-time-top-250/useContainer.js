import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";

import { getAllTimeTop250 } from "@/services/service.games";

const useContainer = () => {
    
    const router = useRouter();

    const { ref, inView } = useInView();

    const [page, setPage] = useState(1);

    const {
        data: AllTimeTop250,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery(
        "all-time-top-200",
        ({ pageParam = 1 }) => getAllTimeTop250(pageParam),
        {
            getNextPageParam: (lastPage) => {
                if (lastPage.length === 0) {
                    return undefined;
                }
                return page + 1;
            },
            keepPreviousData: true,
        }
    );

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
            setPage(page + 1);
        }
    }, [inView, hasNextPage, isFetchingNextPage, page, fetchNextPage]);

    /**
     * flatten the nest array eg.[[1, 2], [3, 4], [5, 6]] to
     * single array [1, 2, 3, 4, 5, 6]
     */
    const gamesData = (AllTimeTop250?.pages || []).flatMap(page => page.results || []);
    const formattedData = gamesData || [];

    return {
        router,
        ref,
        isLoading,
        isError,
        isFetchingNextPage,
        formattedData
    }
};

export default useContainer;