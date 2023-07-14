import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

import { useGetPlatformDetails } from "@/api/platform/platform-detail.query";
import { useGetPlatormsRelatedGames } from "@/api/platform/platform-related-games.query";

const usePlatformDetails = () => {
    const { id } = useParams();

    const { ref, inView } = useInView();

    const platformDetails = useGetPlatformDetails(id);

    const platformRelatedGames = useGetPlatormsRelatedGames(id, 12);

    // for loading
    const isLoading =
        platformDetails.isLoading || platformRelatedGames.isLoading;

    // for error
    const isError = platformDetails.isError || platformRelatedGames.isError;

    // useInfiniteQuery
    const fetchNextPage = platformRelatedGames.fetchNextPage;
    const hasNextPage = platformRelatedGames.hasNextPage;
    const isFetchingNextPage = platformRelatedGames.isFetchingNextPage;

    // access data
    const platformsDetail = platformDetails.data;
    const platformsRelatedGames = platformRelatedGames.data;

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

    return {
        ref,
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        platformsDetail,
        description,
        formattedData,
    };
};

export default usePlatformDetails;
