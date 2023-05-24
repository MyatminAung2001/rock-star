import { useParams } from "next/navigation";
import { useQueries, useInfiniteQuery } from "@tanstack/react-query";

// services
import {
    getDLCAndEditions,
    getGameDetails,
    getGameSeries,
    getScreenShots,
    getStores,
    getTrailers,
    getAchievements,
} from "@/services/service.details";

const useContainer = () => {
    const { slug } = useParams();

    const queryResults = useQueries({
        queries: [
            {
                queryKey: ["details", slug],
                queryFn: () => getGameDetails(slug),
            },
            { queryKey: ["series", slug], queryFn: () => getGameSeries(slug) },
            {
                queryKey: ["screenshots", slug],
                queryFn: () => getScreenShots(slug),
            },
            { queryKey: ["trailers", slug], queryFn: () => getTrailers(slug) },
            { queryKey: ["stores", slug], queryFn: () => getStores(slug) },
            {
                queryKey: ["dlc-editions", slug],
                queryFn: () => getDLCAndEditions(slug),
            },
        ],
    });

    // for achievements
    const infiniteQuery = useInfiniteQuery({
        queryKey: ["achievements", slug],
        queryFn: ({ pageParam = 1 }) => getAchievements({ slug, pageParam }),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.next === null) return undefined;
            return allPages.length + 1;
        },
        keepPreviousData: true,
    });

    // loading
    const isLoading =
        queryResults.some((result) => result.isLoading) ||
        infiniteQuery.isLoading;

    const isError =
        queryResults.some((result) => result.isError) || infiniteQuery.isError;

    const fetchNextPage = infiniteQuery.fetchNextPage;

    const hasNextPage = infiniteQuery.hasNextPage;

    const isFetchingNextPage = infiniteQuery.isFetchingNextPage;

    // access data
    const gameDetails = queryResults[0].data;

    const gameSeries = queryResults[1].data;

    const gameScreenShots = queryResults[2].data;

    const gameTrailers = queryResults[3].data;

    const gameStores = queryResults[4].data;

    const gameDLCAndEditions = queryResults[5].data;

    const achievements = infiniteQuery.data;

    // achievements
    const achievementsData = (achievements?.pages || []).flatMap(
        (page) => page.results || []
    );
    const formattedData = achievementsData || [];

    return {
        isLoading,
        isError,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        gameDetails,
        gameSeries,
        gameScreenShots,
        gameTrailers,
        gameStores,
        gameDLCAndEditions,
        formattedData,
    };
};

export default useContainer;
