import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import {
    getPlatformsDetails,
    getPlatformsGames,
} from "@/services/service.platform";

const useContainer = () => {
    const { id } = useParams();

    const { ref, inView } = useInView();

    const query = useQuery({
        queryKey: ["platforms-detail", id],
        queryFn: () => getPlatformsDetails(id),
    });

    const infiniteQuery = useInfiniteQuery({
        queryKey: ["platforms-games", id],
        queryFn: ({ pageParam = 1 }) => getPlatformsGames({ id, pageParam }),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.next === null) return undefined;
            return allPages.length + 1;
        },
        keepPreviousData: true,
    });

    // for loading
    const isLoading = query.isLoading || infiniteQuery.isLoading;

    // for error
    const isError = query.isError || infiniteQuery.isError;

    // useInfiniteQuery
    const fetchNextPage = infiniteQuery.fetchNextPage;
    const hasNextPage = infiniteQuery.hasNextPage;
    const isFetchingNextPage = infiniteQuery.isFetchingNextPage;

    // access data
    const platformsDetail = query.data;
    const platformsRelatedGames = infiniteQuery.data;

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    const gamesData = (platformsRelatedGames?.pages || []).flatMap(
        (page) => page.results || []
    );
    const formattedData = gamesData || [];

    // content
    // remove p tag from a string
    const myString = platformsDetail?.description;
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
        platformsDetail,
        showFullContent,
        setShowFullContent,
        displayContent,
        description,
        cutOff,
        formattedData,
    };
};

export default useContainer;
