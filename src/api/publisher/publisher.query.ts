import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Publisher } from "@/types/publisher";

export const useGetPublishers = (pageSize: number) => {
    return useInfiniteQuery<Publisher>({
        queryKey: ["publishers"],
        queryFn: async ({ pageParam = 1 }) => {
            return await apiClient
                .get("/publishers", {
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
