import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

type DeveloperDetailsResponse = {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    description: string;
};

export const useGetPlatformDetails = (slug: string) => {
    return useQuery<DeveloperDetailsResponse>({
        queryKey: ["developer-detail", slug],
        queryFn: async () => {
            return await apiClient
                .get(`/developers/${slug}`, {
                    params: {
                        key: process.env.NEXT_PUBLIC_API_KEY,
                    },
                })
                .then((res) => res.data);
        },
    });
};
