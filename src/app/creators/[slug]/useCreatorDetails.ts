import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

import { useGetCreatorDetails } from "@/api/creator/creator-detail.query";
import { useGetRelatedGames } from "@/api/creator/related-games.query";

const useCreatorDetails = () => {
    const { slug } = useParams();

    const { ref, inView } = useInView();

    const query = useGetCreatorDetails(slug);

    const infiniteQuery = useGetRelatedGames(slug, 12);

    // for loading
    const isLoading = query.isLoading || infiniteQuery.isLoading;

    // for error
    const isError = query.isError || infiniteQuery.isError;

    // useInfiniteQuery
    const fetchNextPage = infiniteQuery.fetchNextPage;
    const hasNextPage = infiniteQuery.hasNextPage;
    const isFetchingNextPage = infiniteQuery.isFetchingNextPage;

    // access data
    const creatorsDetail = query.data;
    const creatorsRelatedGames = infiniteQuery.data;

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    const gamesData = (creatorsRelatedGames?.pages || []).flatMap(
        (page) => page.results || []
    );
    const formattedData = gamesData || [];

    // content
    // remove p tag from a string
    const myString = creatorsDetail?.description;
    const description = myString?.replaceAll(/<\/?[^>]+(>|$)/gi, "");

    return {
        ref,
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        creatorsDetail,
        description,
        formattedData,
    };
};

export default useCreatorDetails;
