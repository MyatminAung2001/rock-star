import { useQuery } from "@tanstack/react-query";

import apiClient from "../apiClient";

type GenresDetailsResponse = {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    description: string;
};

export const useGetGenerDetails = (slug: string) => {
    return useQuery<GenresDetailsResponse>({
        queryKey: ["genres-detail", slug],
        queryFn: async () => {
            return await apiClient
                .get(`/genres/${slug}`, {
                    params: {
                        key: process.env.NEXT_PUBLIC_API_KEY,
                    },
                })
                .then((res) => res.data);
        },
    });
};
