import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";

import {
    getPublishersDetails,
    getPublishersGames,
} from "@/services/service.publishers";

const useContainer = () => {
    const { slug } = useParams();

    const { ref, inView } = useInView();

    const {
        isLoading,
        isError,
        data: publishersDetail,
    } = useQuery("publishers-detail", () => getPublishersDetails(slug));

    const [page, setPage] = useState(1);

    const {
        data: publishersGames,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isFetching,
    } = useInfiniteQuery(
        "publishers-games",
        ({ pageParam = 1 }) => getPublishersGames(slug, pageParam),
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

    const gamesData = (publishersGames?.pages || []).flatMap(
        (page) => page.results || []
    );
    const formattedData = gamesData || [];

    return {
        ref,
        isLoading,
        isError,
        publishersDetail,
        formattedData,
        isFetchingNextPage,
        isFetching,
    };
};

export default useContainer;
