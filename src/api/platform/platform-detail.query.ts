import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

type PlatformDetailsResponse = {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    description: string;
    image: null;
    year_start: null;
    year_end: null;
};

export const useGetPlatformDetails = (id: string) => {
    return useQuery<PlatformDetailsResponse>({
        queryKey: ["platform-detail", id],
        queryFn: async () => {
            return await apiClient
                .get(`/platforms/${id}`, {
                    params: {
                        key: process.env.NEXT_PUBLIC_API_KEY,
                    },
                })
                .then((res) => res.data);
        },
    });
};
