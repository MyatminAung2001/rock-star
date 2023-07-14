import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

import { useGetTagDetails } from "@/api/tags/tag-details.query";
import { useGetTagRelatedGames } from "@/api/tags/tag-related-games.query";

const useTagDetails = () => {
    const { slug } = useParams();

    const { ref, inView } = useInView();

    const tagDetails = useGetTagDetails(slug);

    const tagRelatedGames = useGetTagRelatedGames(slug, 12);

    // for loading
    const isLoading = tagDetails.isLoading || tagRelatedGames.isLoading;

    // for error
    const isError = tagDetails.isError || tagRelatedGames.isError;

    // useInfiniteQuery
    const fetchNextPage = tagRelatedGames.fetchNextPage;
    const hasNextPage = tagRelatedGames.hasNextPage;
    const isFetchingNextPage = tagRelatedGames.isFetchingNextPage;

    // access data
    const tagsDetails = tagDetails.data;
    const tagsRelatedGames = tagRelatedGames.data;

    useEffect(() => {
        if (inView && hasNextPage && isFetchingNextPage) {
            fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    const gamesData = (tagsRelatedGames?.pages || []).flatMap(
        (page) => page.results || []
    );
    const formattedData = gamesData || [];

    return {
        ref,
        isError,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        tagsDetails,
        formattedData,
    };
};

export default useTagDetails;
