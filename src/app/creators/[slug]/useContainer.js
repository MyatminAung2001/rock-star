import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";

import {
    getCreatorsDetails,
    getCreatorsGames,
} from "@/services/service.creator";

const useContainer = () => {
    const { slug } = useParams();

    const { ref, inView } = useInView();

    const { data: creatorsDetail } = useQuery("creators-detail", () =>
        getCreatorsDetails(slug)
    );

    const {
        data: creatorsGames,
        isLoading,
        isError,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery(
        "creators-games",
        ({ pageParam = 1 }) => getCreatorsGames(slug, pageParam),
        {
            getNextPageParam: (lastPage, allPages) => {
                if (lastPage.length === 0) {
                    return undefined;
                }
                return allPages.length + 1;
            },
        }
    );

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const gamesData = (creatorsGames?.pages || []).flatMap(
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
        formattedData,
        description,
    };
};

export default useContainer;
