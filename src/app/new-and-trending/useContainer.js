import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useSelector, useDispatch } from "react-redux";

import { getNewAndTrending } from "@/services/service.games";
import { handleFilter, handleDropDown } from "@/store/filter.slice";

const useContainer = () => {
    const { ref, inView } = useInView();

    const dispatch = useDispatch();

    const filterText = useSelector((state) => state.filterSlice.filterText);
    const isDropDownOpen = useSelector(
        (state) => state.filterSlice.isDropDownOpen
    );

    const handleFilterChange = (e) => {
        dispatch(handleFilter(e.target.value));
        dispatch(handleDropDown(!isDropDownOpen));
    };

    const handleDropDownFilter = () => {
        dispatch(handleDropDown(!isDropDownOpen));
    };

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
        handleFilterChange,
        isDropDownOpen,
        handleDropDownFilter,
    };
};

export default useContainer;
