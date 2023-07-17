import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Developers } from "@/types/developer";

export const useGetDevelopers = (pageSize: number) => {
    return useInfiniteQuery<Developers>({
        queryKey: ["developers"],
        queryFn: async ({ pageParam = 1 }) => {
            return await apiClient
                .get("/developers", {
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
