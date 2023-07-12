import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

type DevelopersResponse = {
    count: number;
    next: string;
    previous: null;
    results: {
        id: number;
        name: string;
        slug: string;
        games_count: number;
        image_background: string;
        games: {
            id: number;
            slug: string;
            name: string;
            added: number;
        }[];
    }[];
};

export const useGetPlatforms = (pageSize: number) => {
    return useInfiniteQuery<DevelopersResponse>({
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
