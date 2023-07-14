import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

import { useGetStoreDetails } from "@/api/stores/store-detail.query";
import { useGetStoresRelatedGames } from "@/api/stores/store-related-games.query";

const useStoreDetails = () => {
    const { id } = useParams();

    const { ref, inView } = useInView();

    const storeDetails = useGetStoreDetails(id);

    const storeRelatedGames = useGetStoresRelatedGames(id, 12);

    const isLoading = storeDetails.isLoading || storeRelatedGames.isLoading;

    const isError = storeDetails.isError || storeRelatedGames.isError;

    // infinite query state
    const hasNextPage = storeRelatedGames.hasNextPage;
    const isFetchingNextPage = storeRelatedGames.isFetchingNextPage;
    const fetchNextPage = storeRelatedGames.fetchNextPage;

    // access data
    const storesDetail = storeDetails.data;
    const storesRelatedGames = storeRelatedGames.data;

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

    return {
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        storesDetail,
        description,
        formattedData,
        ref,
    };
};

export default useStoreDetails;
