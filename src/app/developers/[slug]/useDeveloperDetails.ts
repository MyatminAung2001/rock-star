import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useGetDeveloperDetails } from "@/api/developers/developer-details.query";
import { useGetDeveloperRelatedGames } from "@/api/developers/developer-related-games.query";

const useDeveloperDetails = () => {
    const { slug } = useParams();

    const { ref, inView } = useInView();

    const developerDetails = useGetDeveloperDetails(slug);

    const developerRelatedGames = useGetDeveloperRelatedGames(slug, 12);

    // for loading
    const isLoading =
        developerDetails.isLoading || developerRelatedGames.isLoading;

    // for error
    const isError = developerDetails.isError || developerRelatedGames.isError;

    // useInfiniteQuery
    const fetchNextPage = developerRelatedGames.fetchNextPage;
    const hasNextPage = developerRelatedGames.hasNextPage;
    const isFetchingNextPage = developerRelatedGames.isFetchingNextPage;

    // access data
    const developersDetail = developerDetails.data;
    const developersRelatedGames = developerRelatedGames.data;

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    const gamesData = (developersRelatedGames?.pages || []).flatMap(
        (page) => page.results || []
    );
    const formattedData = gamesData || [];

    return {
        ref,
        isError,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
        developersDetail,
        formattedData,
    };
};

export default useDeveloperDetails;
