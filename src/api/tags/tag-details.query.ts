import { useQuery } from "@tanstack/react-query";

import apiClient from "../apiClient";

type TagDetailsResponse = {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    description: string;
};

export const useGetTagDetails = (slug: string) => {
    return useQuery<TagDetailsResponse>({
        queryKey: ["tag-details", slug],
        queryFn: async () => {
            return await apiClient
                .get(`/tags/${slug}`, {
                    params: {
                        key: process.env.NEXT_PUBLIC_API_KEY,
                    },
                })
                .then((res) => res.data);
        },
    });
};
