import { useInfiniteQuery } from "@tanstack/react-query";

import apiClient from "../apiClient";
import { Games } from "@/types/games";

export const useGetPopularIn2022 = (
    pageSize: number,
    filterText: string,
    previousYear: number
) => {
    return useInfiniteQuery<Games>({
        queryKey: ["popular-in-2022", filterText],
        queryFn: async ({ pageParam = 1 }) => {
            return await apiClient
                .get("/games/lists/greatest", {
                    params: {
                        key: process.env.NEXT_PUBLIC_API_KEY,
                        year: previousYear,
                        discover: true,
                        ordering: `-${filterText}`,
                        page: pageParam,
                        page_size: pageSize,
                    },
                })
                .then((res) => res.data);
        },
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.next === null) return undefined;
            return allPages.length + 1;
        },
    });
};
