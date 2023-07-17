import { useInfiniteQuery } from "@tanstack/react-query";

import apiClient from "../apiClient";
import { Games } from "@/types/games";

export const useGetBestOfTheYear = (pageSize: number, filterText: string) => {
    return useInfiniteQuery<Games>({
        queryKey: ["best-of-the-year", filterText],
        queryFn: async ({ pageParam = 1 }) => {
            return await apiClient
                .get("/games/lists/greatest", {
                    params: {
                        key: process.env.NEXT_PUBLIC_API_KEY,
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
