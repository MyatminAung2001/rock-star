import { useQueries } from "@tanstack/react-query";

import {
    getLast30Days,
    getThisWeek,
    getUpcomingGames,
} from "@/services/service.games";

const useContainer = () => {
    const queryResults = useQueries({
        queries: [
            { queryKey: ["upcoming"], queryFn: () => getUpcomingGames() },
            { queryKey: ["last-30days"], queryFn: () => getLast30Days() },
            { queryKey: ["this-week"], queryFn: () => getThisWeek() },
        ],
    });

    const UpcomingGames = queryResults[0].data;

    const Last30DaysGames = queryResults[1].data;

    const ThisWeekGames = queryResults[2].data;

    // loading
    const isLoading = queryResults.some((result) => result.isLoading);

    return {
        isLoading,
        UpcomingGames,
        Last30DaysGames,
        ThisWeekGames,
    };
};

export default useContainer;
