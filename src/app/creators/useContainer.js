import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";

import { getCreators } from "@/services/service.creator";

const useContainer = () => {

    const router = useRouter();

    const { ref, inView } = useInView();

    const [page, setPage] = useState(1);

    const {
        data: creators,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isLoading,
        isError,
    } = useInfiniteQuery(
        "creators",
        ({ pageParam = 1 }) => getCreators(pageParam),
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

    const gamesData = (creators?.pages || []).flatMap(page => page.results || []);
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