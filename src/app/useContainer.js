import { useQueries } from "@tanstack/react-query";

import { getUpcomingGames } from "@/services/service.games";

const useContainer = () => {
    const queryResults = useQueries({
        queries: [
            { queryKey: ["upcoming"], queryFn: () => getUpcomingGames() },
        ],
    });

    const UpcomingGames = queryResults[0].data;

    console.log("upcoming", UpcomingGames);

    // loading
    const isLoading = queryResults.some((result) => result.isLoading);

    return {
        UpcomingGames,
        isLoading,
    };
};

export default useContainer;
