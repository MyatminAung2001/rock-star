import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";

import { getTags } from "@/services/service.tags";

const useContainer = () => {
    const router = useRouter();

    const { ref, inView } = useInView();

    const [page, setPage] = useState(1);

    const {
        data: tags,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isFetching,
        isError,
        isLoading,
    } = useInfiniteQuery("tags", ({ pageParam = 1 }) => getTags(pageParam), {
        getNextPageParam: (lastPage) => {
            if (lastPage.length === 0) {
                return undefined;
            }
            return page + 1;
        },
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
            setPage(page + 1);
        }
    }, [inView, hasNextPage, isFetchingNextPage, page, fetchNextPage]);

    const gamesData = (tags?.pages || []).flatMap((page) => page.results || []);
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
