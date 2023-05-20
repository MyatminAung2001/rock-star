import { useQueries } from "@tanstack/react-query";

import {
    getLast30Days,
    getNextWeek,
    getThisWeek,
    getUpcomingGames,
} from "@/services/service.games";

const useContainer = () => {
    const queryResults = useQueries({
        queries: [
            { queryKey: ["upcoming"], queryFn: () => getUpcomingGames() },
            { queryKey: ["last-30days"], queryFn: () => getLast30Days() },
            { queryKey: ["this-week"], queryFn: () => getThisWeek() },
            { queryKey: ["next-week"], queryFn: () => getNextWeek() },
        ],
    });

    const UpcomingGames = queryResults[0].data;

    const Last30DaysGames = queryResults[1].data;

    const ThisWeekGames = queryResults[2].data;

    const NextWeekGames = queryResults[3].data;

    // loading
    const isLoading = queryResults.some((result) => result.isLoading);

    return {
        isLoading,
        UpcomingGames,
        Last30DaysGames,
        ThisWeekGames,
        NextWeekGames,
    };
};

export default useContainer;
