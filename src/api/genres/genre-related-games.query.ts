import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { RelatedGames } from "@/types/games";

export const useGetGenreRelatedGames = (slug: string, pageSize: number) => {
    return useInfiniteQuery<RelatedGames>({
        queryKey: ["genre-related-games", slug],
        queryFn: async ({ pageParam = 1 }) => {
            return await apiClient
                .get("/games", {
                    params: {
                        key: process.env.NEXT_PUBLIC_API_KEY,
                        genres: slug,
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
