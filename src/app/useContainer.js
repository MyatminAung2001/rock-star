import { useQuery } from "@tanstack/react-query";

import { getUpcomingGames } from "@/services/service.games";

const useContainer = () => {
    const {
        data: UpcomingGames,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ["upcoming"],
        queryFn: () => getUpcomingGames(),
    });

    return {
        UpcomingGames,
        isError,
        isLoading,
    };
};

export default useContainer;
