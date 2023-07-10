import Image from "next/image";
import { useInfiniteQuery } from "@tanstack/react-query";

import { getAchievements } from "@/services/service.details";
import { Loading } from "../Common/Loading";

const Achievements = ({ slug, gameDetails }) => {
    const {
        data: achievements,
        isError,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["achievements"],
        queryFn: ({ pageParam = 1 }) => getAchievements({ slug, pageParam }),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length === 0) return undefined;
            return allPages.length + 1;
        },
        keepPreviousData: true,
    });

    const achievementsData = (achievements?.pages || []).flatMap(
        (page) => page.results || []
    );
    const formattedData = achievementsData || [];

    if (isLoading) return <Loading />;

    return (
        <>
            {achievementsData.length > 0 && (
                <div className="mb-5">
                    <p className="detail-heading mb-3">
                        {gameDetails.name} achievements
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                        {formattedData?.map((achievement) => (
                            <div
                                key={achievement.id}
                                className="flex items-start gap-x-2"
                            >
                                {achievement?.image && (
                                    <Image
                                        src={achievement.image}
                                        alt={achievement.name}
                                        width={50}
                                        height={50}
                                        className="object-cover w-[50px] h-[50px] rounded-md"
                                    />
                                )}
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
                    <div className="w-[100%] flex items-center justify-center mt-5">
                        <div>
                            <button
                                type="button"
                                disabled={!hasNextPage || isFetchingNextPage}
                                onClick={() => hasNextPage && fetchNextPage()}
                                className="px-4 py-2 bg-secondary-bg-black text-primary-white font-light text-sm rounded-md"
                            >
                                {isFetchingNextPage
                                    ? "Loading more..."
                                    : hasNextPage
                                    ? "Load More"
                                    : "Nothing more to load"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Achievements;
