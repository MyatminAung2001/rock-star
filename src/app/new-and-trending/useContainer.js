import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { getNewAndTrending } from "@/services/service.games";
import useFilter from "@/hooks/useFilter";

const useContainer = () => {
    const { ref, inView } = useInView();

    const { filterText, isDropDownOpen, handleDropDown, handleFilter } =
        useFilter("relevance", false);

    const {
        data: NewAndTrending,
        isError,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["new-and-trending", filterText],
        queryFn: ({ pageParam = 1 }) =>
            getNewAndTrending({ pageParam, filterText }),
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

    const gamesData = (NewAndTrending?.pages || []).flatMap(
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
        filterText,
        isDropDownOpen,
        handleDropDown,
        handleFilter,
    };
};

export default useContainer;
