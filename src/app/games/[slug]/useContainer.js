import { useParams } from "next/navigation";
import { useQueries } from "@tanstack/react-query";

// services
import {
    getDLCAndEditions,
    getGameDetails,
    getGameSeries,
    getScreenShots,
    getStores,
    getTrailers,
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

    // loading
    const isLoading = queryResults.some((result) => result.isLoading);

    const gameDetails = queryResults[0].data;

    const gameSeries = queryResults[1].data;

    const gameScreenShots = queryResults[2].data;

    const gameTrailers = queryResults[3].data;

    const gameStores = queryResults[4].data;

    const gameDLCAndEditions = queryResults[5].data;

    return {
        slug,
        isLoading,
        gameDetails,
        gameSeries,
        gameScreenShots,
        gameTrailers,
        gameStores,
        gameDLCAndEditions,
    };
};

export default useContainer;
