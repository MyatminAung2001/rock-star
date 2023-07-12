import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

type RelatedGamesResponse = {
    count: number;
    next: null | string;
    previous: string | null;
    results: {
        slug: string;
        name: string;
        playtime: number;
        platforms: {
            platform: {
                id: number;
                name: string;
                slug: string;
            };
        }[];
        stores: {
            store: {
                id: number;
                name: string;
                slug: string;
            };
        }[];
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
        metacritic: null | number;
        suggestions_count: number;
        updated: string;
        id: number;
        score: null;
        clip: null;
        tags: {
            id: number;
            name: string;
            slug: string;
            language: string;
            games_count: number;
            image_background: string;
        }[];
        esrb_rating: {
            id: number;
            name: string;
            slug: string;
            name_en: string;
            name_ru: string;
        };
        user_game: null;
        reviews_count: number;
        saturated_color: string;
        dominant_color: string;
        short_screenshots: {
            id: number;
            image: string;
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
        }[];
    }[];
    user_platforms: false;
};

export const useGetDeveloperRelatedGames = (slug: string, pageSize: number) => {
    return useInfiniteQuery<RelatedGamesResponse>({
        queryKey: ["developer-related-games", slug],
        queryFn: async ({ pageParam = 1 }) => {
            return await apiClient
                .get("/games", {
                    params: {
                        key: process.env.NEXT_PUBLIC_API_KEY,
                        developers: slug,
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
