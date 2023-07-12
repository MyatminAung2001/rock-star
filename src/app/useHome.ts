import { useGetUpcomingGames } from "@/api/games/upcoming-games.query";

const useHome = () => {
    const queryResults = useGetUpcomingGames(12);

    const UpcomingGames = queryResults[0]?.data;

    const Last30DaysGames = queryResults[1].data;

    const ThisWeekGames = queryResults[2].data;

    const NextWeekGames = queryResults[3].data;

    const isLoading = queryResults.some((result) => result.isLoading);

    return {
        isLoading,
        UpcomingGames,
        Last30DaysGames,
        ThisWeekGames,
        NextWeekGames,
    };
};

export default useHome;
