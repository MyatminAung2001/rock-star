import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import {
    getPublishersDetails,
    getPublishersGames,
} from "@/services/service.publishers";

const useContainer = () => {
    const { slug } = useParams();

    const { ref, inView } = useInView();

    const { data: publishersDetail } = useQuery({
        queryKey: ["publishers-detail", slug],
        queryFn: () => getPublishersDetails(slug),
    });

    const {
        data: publishersGames,
        isError,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["publishers-games", slug],
        queryFn: ({ pageParam = 1 }) => getPublishersGames({ slug, pageParam }),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length === 0) return undefined;
            return allPages.length + 1;
        },
        keepPreviousData: true,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

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
    };
};

export default useContainer;
