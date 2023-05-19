import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { getNewAndTrending } from "@/services/service.games";

const useContainer = () => {
    const router = useRouter();

    const { ref, inView } = useInView();

    const [option, setOption] = useState("relevance");
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    const options = [
        "relevance",
        "name",
        "released",
        "added",
        "created",
        "updated",
        "rating",
        "metacritic",
    ];

    const {
        data: NewAndTrending,
        isError,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["new-and-trending", option],
        queryFn: ({ pageParam = 1 }) =>
            getNewAndTrending({ pageParam, option }),
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

    const gamesData = (NewAndTrending?.pages || []).flatMap(
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
        options,
        isDropDownOpen,
        setIsDropDownOpen,
        option,
        setOption,
    };
};

export default useContainer;
