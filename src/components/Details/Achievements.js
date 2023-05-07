import Image from "next/image";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";

import { getAchievements } from "@/services/service.details";

const Achievements = ({ slug, gameDetails }) => {

    const [page, setPage] = useState(1);

    const { data: achievements, hasNextPage, fetchNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery(
        "achievements",
        ({ pageParam = 1 }) => getAchievements(slug, pageParam),
        {
        getNextPageParam: (lastPage) => {
            if (lastPage.length === 0) {
            return undefined;
            }
            return page + 1;
        },
        }
    );

    const handleViewMore = () => {
        if (!isFetchingNextPage) {
            fetchNextPage();
            setPage(prevPage => prevPage + 1)
        }
    };

    const gamesData = achievements?.pages.flatMap((page) => page);

    const formatted = gamesData?.map((d) => d.results);

    const achievementsData = gamesData ? [].concat(...formatted) : [];

    return (
        <>
            {achievementsData.length > 0 && (
                <div className="mb-5">
                    <p className="text-xl text-primary-white mb-3">
                        {gameDetails.name} achievements
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                        {achievementsData?.map(achievement => (
                            <div 
                                key={achievement.id}
                                className="flex items-start gap-x-4"
                            >
                                <Image 
                                    src={achievement.image}
                                    alt={achievement.name}
                                    width={50}
                                    height={50}
                                />
                                <div>
                                    <p className="text-xs text-primary-white font-light">
                                        {achievement.percent} %
                                    </p>
                                    <p className="text-sm text-primary-white">
                                        {achievement.name}
                                    </p>
                                    <p className="text-xs text-[#FFFFFF66] font-light">
                                        {achievement.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    {hasNextPage && (
                        <div className="w-[100%] flex items-center justify-center mt-5">
                            <div>
                                <button 
                                    disabled={isFetchingNextPage} 
                                    onClick={handleViewMore}
                                    className="px-4 py-2 bg-secondary-bg-black text-primary-white font-light text-sm rounded-md"
                                >
                                    {isFetchingNextPage ? "Loading..." : "View More"}
                                </button>
                              
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Achievements;