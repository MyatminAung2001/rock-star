import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Platform } from "@/types/platform";

export const useGetPlatforms = (pageSize: number) => {
    return useInfiniteQuery<Platform>({
        queryKey: ["platforms"],
        queryFn: async ({ pageParam = 1 }) => {
            return await apiClient
                .get("/platforms", {
                    params: {
                        key: process.env.NEXT_PUBLIC_API_KEY,
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
