import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Tag } from "@/types/tag";

export const useGetTags = (pageSize: number) => {
    return useInfiniteQuery<Tag>({
        queryKey: ["tags"],
        queryFn: async ({ pageParam = 1 }) => {
            return await apiClient
                .get("/tags", {
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
