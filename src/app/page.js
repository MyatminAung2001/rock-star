import { dehydrate } from "@tanstack/react-query";

import getQueryClient from "@/utils/getQueryCilent";
import Hydrate from "@/utils/hydrateOnClient";
import {
    getLast30Days,
    getNextWeek,
    getThisWeek,
    getUpcomingGames,
} from "@/services/service.games";
import Home from "./home";

export default async function Page() {
    const queryClient = getQueryClient();

    const queryConfig = {
        upcoming: () => getUpcomingGames(),
        "last-30days": () => getLast30Days(),
        "this-week": () => getThisWeek(),
        "next-week": () => getNextWeek(),
    };

    const prefetchPromises = Object.entries(queryConfig).map(
        ([queryKey, fetchDataFn]) =>
            queryClient.prefetchQuery(queryKey, fetchDataFn)
    );

    await Promise.all(prefetchPromises);

    const dehydrateState = dehydrate(queryClient);

    return (
        <Hydrate state={dehydrateState}>
            <Home />
        </Hydrate>
    );
}
