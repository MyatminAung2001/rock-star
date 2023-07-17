import { useQueries } from "@tanstack/react-query";

import apiClient from "../apiClient";

export const useGetUpcomingGames = (pageSize: number) => {
    return useQueries({
        queries: [
            {
                queryKey: ["upcoming"],
                queryFn: async ({ pageParam = 1 }) => {
                    return await apiClient
                        .get("/games/lists/main", {
                            params: {
                                key: process.env.NEXT_PUBLIC_API_KEY,
                                ordering: "-released",
                                page: pageParam,
                                page_size: pageSize,
                            },
                        })
                        .then((res) => res.data);
                },
            },
            {
                queryKey: ["last-30days"],
                queryFn: async ({ pageParam = 1 }) => {
                    return await apiClient
                        .get("/games/lists/recent-games-past", {
                            params: {
                                key: process.env.NEXT_PUBLIC_API_KEY,
                                ordering: "-added",
                                page: pageParam,
                                page_size: pageSize,
                            },
                        })
                        .then((res) => res.data);
                },
            },
            {
                queryKey: ["this-week"],
                queryFn: async ({ pageParam = 1 }) => {
                    return await apiClient
                        .get("/games/lists/recent-games", {
                            params: {
                                key: process.env.NEXT_PUBLIC_API_KEY,
                                ordering: "-added",
                                page: pageParam,
                                page_size: pageSize,
                            },
                        })
                        .then((res) => res.data);
                },
            },
            {
                queryKey: ["next-week"],
                queryFn: async ({ pageParam = 1 }) => {
                    return await apiClient
                        .get("/games/lists/recent-games-future", {
                            params: {
                                key: process.env.NEXT_PUBLIC_API_KEY,
                                ordering: "-added",
                                page: pageParam,
                                page_size: pageSize,
                            },
                        })
                        .then((res) => res.data);
                },
            },
        ],
    });
};
