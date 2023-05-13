import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";

import { getStoresDetails, getStoresGames } from "@/services/service.stores";

const useContainer = () => {
    const { id } = useParams();

    const { ref, inView } = useInView();

    const {
        isLoading,
        isError,
        data: storesDetail,
    } = useQuery("stores-detail", () => getStoresDetails(id));

    const [page, setPage] = useState(1);

    const {
        data: storesGames,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isFetching,
    } = useInfiniteQuery(
        "stores-games",
        ({ pageParam = 1 }) => getStoresGames(id, pageParam),
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

    const gamesData = (storesGames?.pages || []).flatMap(
        (page) => page.results || []
    );
    const formattedData = gamesData || [];

    // content
    // remove p tag from a string
    const myString = storesDetail?.description;
    const description = myString?.replace(/<p>|<\/p>/gi, "");

    // control read more state
    const [showFullContent, setShowFullContent] = useState(false);

    const cutOff = 165;

    const displayContent =
        description?.length <= cutOff || showFullContent
            ? description
            : `${description?.substring(0, cutOff)}`;

    return {
        ref,
        isLoading,
        isError,
        storesDetail,
        showFullContent,
        setShowFullContent,
        displayContent,
        description,
        cutOff,
        isFetchingNextPage,
        isFetching,
        formattedData,
    };
};

export default useContainer;
