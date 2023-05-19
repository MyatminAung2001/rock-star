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

    const { data: platformsDetail } = useQuery({
        queryKey: ["platforms-detail"],
        queryFn: () => getPlatformsDetails(id),
    });

    const {
        data: platformsGames,
        isError,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["platforms-games"],
        queryFn: ({ pageParam = 1 }) => getPlatformsGames({ id, pageParam }),
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

    const gamesData = (platformsGames?.pages || []).flatMap(
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
        platformsDetail,
        showFullContent,
        setShowFullContent,
        displayContent,
        description,
        cutOff,
        isFetchingNextPage,
        formattedData,
    };
};

export default useContainer;
