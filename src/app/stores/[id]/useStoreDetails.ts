import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { getStoresDetails, getStoresGames } from "@/services/service.stores";

const useStoreDetails = () => {
    const { id } = useParams();

    const { ref, inView } = useInView();

    const query = useQuery({
        queryKey: ["stores-detail", id],
        queryFn: () => getStoresDetails(id),
    });

    const infiniteQuery = useInfiniteQuery({
        queryKey: ["stores-games", id],
        queryFn: ({ pageParam = 1 }) => getStoresGames({ id, pageParam }),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.next === null) return undefined;
            return allPages.length + 1;
        },
        keepPreviousData: true,
    });

    const isLoading = query.isLoading || infiniteQuery.isLoading;

    const isError = query.isError || infiniteQuery.isError;

    // infinite query state
    const hasNextPage = infiniteQuery.hasNextPage;
    const isFetchingNextPage = infiniteQuery.isFetchingNextPage;
    const fetchNextPage = infiniteQuery.fetchNextPage;

    // access data
    const storesDetail = query.data;
    const storesRelatedGames = infiniteQuery.data;

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    const gamesData = (storesRelatedGames?.pages || []).flatMap(
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
        isFetchingNextPage,
        hasNextPage,
        storesDetail,
        showFullContent,
        setShowFullContent,
        displayContent,
        description,
        cutOff,
        formattedData,
    };
};

export default useStoreDetails;
