import { useQueries } from "@tanstack/react-query";

import apiClient from "../apiClient";

interface UpcomingGamesResponse {
    count: number;
    next: string;
    previous: null;
    results: {
        id: number;
        slug: string;
        name: string;
        released: string;
        tba: boolean;
        background_image: string;
        rating: number;
        rating_top: number;
        ratings: {
            id: number;
            title: string;
            count: number;
            percent: number;
        }[];
        ratings_count: number;
        reviews_text_count: number;
        added: number;
        added_by_status: {
            yet: number;
            owned: number;
            beaten: number;
            toplay: number;
            dropped: number;
            playing: number;
        };
        metacritic: null;
        playtime: number;
        suggestions_count: number;
        updated: string;
        user_game: null;
        reviews_count: number;
        saturated_color: string;
        dominant_color: string;
        platforms: {
            platform: {
                id: number;
                name: string;
                slug: string;
                image: null;
                year_end: null;
                year_start: null;
                games_count: number;
                image_background: string;
            };
            released_at: string;
            requirements_en: null;
            requirements_ru: null;
        }[];
        parent_platforms: {
            platform: {
                id: number;
                name: string;
                slug: string;
            };
        }[];
        genres: {
            id: number;
            name: string;
            slug: string;
            games_count: number;
            image_background: string;
        }[];
        stores: [];
        clip: null;
        tags: {
            id: number;
            name: string;
            slug: string;
            language: string;
            games_count: number;
            image_background: string;
        }[];
        esrb_rating: null;
        short_screenshots: {
            id: number;
            image: string;
        }[];
    }[];
    games_count: number;
    reviews_count: number;
    recommendations_count: number;
}

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
