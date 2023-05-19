import { useRouter, useParams } from "next/navigation";
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

    const router = useRouter();

    const queryResults = useQueries({
        queries: [
            { queryKey: "details", queryFn: () => getGameDetails(slug) },
            { queryKey: "series", queryFn: () => getGameSeries(slug) },
            { queryKey: "screenshots", queryFn: () => getScreenShots(slug) },
            { queryKey: "trailers", queryFn: () => getTrailers(slug) },
            { queryKey: "stores", queryFn: () => getStores(slug) },
            {
                queryKey: "dlc-editions",
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
        router,
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
