import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

type StoreDetailsResponse = {
    id: number;
    name: string;
    domain: string;
    slug: string;
    games_count: number;
    image_background: string;
    description: string;
};

export const useGetStoreDetails = (id: string) => {
    return useQuery<StoreDetailsResponse>({
        queryKey: ["stores-detail", id],
        queryFn: async () => {
            return await apiClient
                .get(`/stores/${id}`, {
                    params: {
                        key: process.env.NEXT_PUBLIC_API_KEY,
                    },
                })
                .then((res) => res.data);
        },
    });
};
