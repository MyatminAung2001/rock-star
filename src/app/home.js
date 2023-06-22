"use client";

import useContainer from "./useContainer";
import Loading from "./loading";
import SwiperCard from "@/components/Home/SwiperCard";

const Home = () => {
    const {
        isLoading,
        UpcomingGames,
        Last30DaysGames,
        ThisWeekGames,
        NextWeekGames,
    } = useContainer();

    if (isLoading) return <Loading />;

    return (
        <div className="mb-5 xl:w-[73rem] 2xl:w-[105rem]">
            <div className="p-4">
                <p className="heading mb-3">Upcoming Games</p>
                <SwiperCard gamesData={UpcomingGames?.results} />
            </div>

            <div className="p-4">
                <p className="heading mb-3">Last 30 Days</p>
                <SwiperCard gamesData={Last30DaysGames?.results} />
            </div>

            <div className="p-4">
                <p className="heading mb-3">This Week</p>
                <SwiperCard gamesData={ThisWeekGames?.results} />
            </div>

            <div className="p-4">
                <p className="heading mb-3">Next Week</p>
                <SwiperCard gamesData={NextWeekGames?.results} />
            </div>
        </div>
    );
};

export default Home;
