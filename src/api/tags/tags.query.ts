import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

type TagsResponse = {
    count: number;
    next: null | string;
    previous: null | string;
    results: {
        id: number;
        name: string;
        slug: string;
        games_count: number;
        image_background: string;
        language: string;
        games: {
            id: number;
            slug: string;
            name: string;
            added: number;
        }[];
    }[];
};

export const useGetTags = (pageSize: number) => {
    return useInfiniteQuery<TagsResponse>({
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
