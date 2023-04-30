import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";

import { getDevelopersDetails, getDevelopersGames } from "@/services/service.developers";

const useDevelopers = () => {
    
    const { slug } = useParams();

    const { ref, inView } = useInView();

    const { isLoading, isError, data: developersDetail } = useQuery("developers-detail", () => getDevelopersDetails(slug));

    const [page, setPage] = useState(1);

    const { data: developersGames, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
        "developers-games",
        ({ pageParam = 1 }) => getDevelopersGames(slug, pageParam),
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

    const gamesData = developersGames?.pages.flatMap((page) => page);

    const formatted = gamesData?.map((d) => d.results);

    const realData = gamesData ? [].concat(...formatted) : [];

    return {
        ref,
        isLoading,
        isError,
        developersDetail,
        realData,
        isFetchingNextPage
    }
}

export default useDevelopers;