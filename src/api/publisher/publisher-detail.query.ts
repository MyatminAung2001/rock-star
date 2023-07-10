import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

type PublisherDetailsResponse = {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    description: string;
};

export const useGetPublisherDetails = (slug: string) => {
    return useQuery<PublisherDetailsResponse>({
        queryKey: ["publisher-details"],
        queryFn: async () => {
            return await apiClient
                .get(`/publishers/${slug}`, {
                    params: {
                        key: process.env.NEXT_PUBLIC_API_KEY,
                    },
                })
                .then((res) => res.data);
        },
    });
};
