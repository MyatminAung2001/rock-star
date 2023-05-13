import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";

import { getPublishers } from "@/services/service.publishers";

const useContainer = () => {
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

    const gamesData = (publishers?.pages || []).flatMap(
        (page) => page.results || []
    );
    const formattedData = gamesData || [];

    return {
        router,
        ref,
        isLoading,
        isError,
        isFetchingNextPage,
        formattedData,
    };
};

export default useContainer;
