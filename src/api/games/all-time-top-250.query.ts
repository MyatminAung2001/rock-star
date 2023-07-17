import { useInfiniteQuery } from "@tanstack/react-query";

import apiClient from "../apiClient";

type AllTimeTop250Response = {
    count: number;
    next: string | null;
    previous: null | string;
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
        metacritic: number;
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
                year_start: number;
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
        stores: {
            id: number;
            store: {
                id: number;
                name: string;
                slug: string;
                domain: string;
                games_count: number;
                image_background: string;
            };
        }[];
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
        };
        short_screenshots: {
            id: number;
            image: string;
        }[];
    }[];
};

// this is not prefect, but it's good enough for now
export const getAllTimeTop250 = async (
    pageParam: number,
    pageSize: number,
    filterText?: string
) => {
    return await apiClient
        .get("/games/lists/popular", {
            params: {
                key: process.env.NEXT_PUBLIC_API_KEY,
                discover: true,
                ordering: `-${filterText}`,
                page: pageParam,
                page_size: pageSize,
            },
        })
        .then((res) => res.data);
};

export const useGetAllTimeTop250 = (pageSize: number, filterText: string) => {
    return useInfiniteQuery<AllTimeTop250Response>({
        queryKey: ["all-time-top-250", filterText],
        queryFn: ({ pageParam = 1 }) =>
            getAllTimeTop250(pageParam, pageSize, filterText),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.next === null) return undefined;
            return allPages.length + 1;
        },
    });
};
