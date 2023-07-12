import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import useFilter from "@/hooks/useFilter";
import { useGetBestOfTheYear } from "@/api/games/best-of-the-year.query";

const useBestOfTheYear = () => {
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
    } = useGetBestOfTheYear(12, filterText);

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    const gamesData = (data?.pages || []).flatMap((page) => page.results || []);
    const formattedData = gamesData || [];

    return {
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        formattedData,
        filterText,
        isDropDownOpen,
        ref,
        handleDropDown,
        handleFilter,
    };
};

export default useBestOfTheYear;
