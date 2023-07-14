import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

import { useGetPublisherDetails } from "@/api/publisher/publisher-details.query";
import { useGetPublisherRelatedGames } from "@/api/publisher/publisher-related-games.query";

const usePublisherDetails = () => {
    const { slug } = useParams();

    const { ref, inView } = useInView();

    const publisherDetails = useGetPublisherDetails(slug);

    const publisherRelatedGames = useGetPublisherRelatedGames(slug, 12);

    // for loading
    const isLoading =
        publisherDetails.isLoading || publisherRelatedGames.isLoading;

    // for error
    const isError = publisherDetails.isError || publisherRelatedGames.isError;

    // useInfiniteQuery
    const fetchNextPage = publisherRelatedGames.fetchNextPage;
    const hasNextPage = publisherRelatedGames.hasNextPage;
    const isFetchingNextPage = publisherRelatedGames.isFetchingNextPage;

    // access data
    const publishersDetail = publisherDetails.data;
    const publishersRelatedGames = publisherRelatedGames.data;

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    const gamesData = (publishersRelatedGames?.pages || []).flatMap(
        (page) => page.results || []
    );
    const formattedData = gamesData || [];

    return {
        isError,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        publishersDetail,
        formattedData,
        ref,
    };
};

export default usePublisherDetails;
