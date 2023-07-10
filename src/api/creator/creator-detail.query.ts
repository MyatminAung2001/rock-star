import { useQuery } from "@tanstack/react-query";

import apiClient from "../apiClient";

type CreatorDetailsResponse = {
    id: number;
    name: string;
    slug: string;
    image: string;
    image_background: string;
    description: string;
    games_count: number;
    reviews_count: number;
    rating: string;
    rating_top: number;
    updated: string;
    positions: {
        id: number;
        name: string;
        slug: string;
    }[];
    platforms: {
        total: number;
        results: {
            count: number;
            percent: number;
            platform: {
                id: number;
                name: string;
                slug: string;
            };
        }[];
        count: number;
    };
    ratings: {
        id: number;
        title: string;
        count: number;
        percent: number;
    }[];
    timeline: {
        year: number;
        count: number;
    }[];
};

export const useGetCreatorDetails = (slug: string) => {
    return useQuery<CreatorDetailsResponse>({
        queryKey: ["creator-details", slug],
        queryFn: async () => {
            return await apiClient
                .get(`/creators/${slug}`, {
                    params: {
                        key: process.env.NEXT_PUBLIC_API_KEY,
                    },
                })
                .then((res) => res.data);
        },
    });
};
