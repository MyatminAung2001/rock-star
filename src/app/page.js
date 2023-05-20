"use client";

import useContainer from "./useContainer";
import { Loading } from "@/components/Common/Loading";
import SwiperCard from "@/components/Home/SwiperCard";

const Page = () => {
    const { UpcomingGames, isLoading } = useContainer();

    if (isLoading) return <Loading />;

    return (
        <div className="mb-5 xl:w-[75rem] 2xl:w-[105rem]">
            <SwiperCard upcoming={UpcomingGames?.results} />
        </div>
    );
};

export default Page;
