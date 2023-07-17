import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Creators } from "@/types/creator";

export const useGetCreators = (pageSize: number) => {
    return useInfiniteQuery<Creators>({
        queryKey: ["creators"],
        queryFn: async ({ pageParam = 1 }) => {
            return await apiClient
                .get("/creators", {
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
