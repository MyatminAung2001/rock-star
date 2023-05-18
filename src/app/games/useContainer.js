import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";

import { GetAllGames } from "@/services/service.games";

const useContainer = () => {
    const router = useRouter();

    const { ref, inView } = useInView();

    const [page, setPage] = useState(1);

    const {
        data: Games,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isFetching,
        isLoading,
        isError,
    } = useInfiniteQuery(
        "games",
        ({ pageParam = 1 }) => GetAllGames(pageParam),
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

    const gamesData = (Games?.pages || []).flatMap(
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
        Games,
    };
};

export default useContainer;
