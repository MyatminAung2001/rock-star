import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

type CreatorsResponse = {
    count: number;
    next: string | null;
    previous: null | string;
    results: {
        id: number;
        name: string;
        slug: string;
        image: string;
        image_background: string;
        games_count: number;
        positions: {
            id: number;
            name: string;
            slug: string;
        }[];
        games: {
            id: number;
            slug: string;
            name: string;
            added: number;
        }[];
    }[];
};

export const useGetCreators = (pageSize: number) => {
    return useInfiniteQuery<CreatorsResponse>({
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
