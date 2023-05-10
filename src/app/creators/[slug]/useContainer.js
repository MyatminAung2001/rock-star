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

    const {
        isLoading,
        isError,
        data: creatorsDetail,
    } = useQuery("creators-detail", () => getCreatorsDetails(slug));

    const [page, setPage] = useState(1);

    const {
        data: creatorsGames,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery(
        "creators-games",
        ({ pageParam = 1 }) => getCreatorsGames(slug, pageParam),
        {
            getNextPageParam: (lastPage) => {
                if (lastPage.length === 0) {
                    return undefined;
                }
                return page + 1;
            },
        }
    );

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
            setPage(page + 1);
        }
    }, [inView, hasNextPage, isFetchingNextPage, page, fetchNextPage]);

    const gamesData = (creatorsGames?.pages || []).flatMap(page => page.results || []);
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
        creatorsDetail,
        formattedData,
        description
    }
};

export default useContainer;