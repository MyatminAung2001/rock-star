import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import useFilter from "@/hooks/useFilter";
import { useGetAllTimeTop250 } from "@/api/games/all-time-top-250.query";

const useContainer = () => {
    const { ref, inView } = useInView();

    const { filterText, isDropDownOpen, handleDropDown, handleFilter } =
        useFilter("relevance", false);

    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useGetAllTimeTop250(12);

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    /**
     * flatten the nest array eg.[[1, 2], [3, 4], [5, 6]] to
     * single array [1, 2, 3, 4, 5, 6]
     * and map the results
     */
    const gamesData = (data?.pages || []).flatMap((page) => page.results || []);
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
