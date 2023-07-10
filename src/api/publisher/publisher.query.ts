import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

type PublishersResponse = {
    count: number;
    next: string | null;
    previous: null | string;
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

export const useGetPublishers = (pageSize: number) => {
    return useInfiniteQuery<PublishersResponse>({
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
