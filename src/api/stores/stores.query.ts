import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";

type StoresResponse = {
    count: number;
    next: null | string;
    previous: null | string;
    results: {
        id: number;
        name: string;
        domain: string;
        slug: string;
        games_count: number;
        image_background: string;
        games: {
            id: number;
            slug: string;
            name: string;
            added: number;
        }[];
    }[];
};

export const useGetStores = () => {
    return useQuery<StoresResponse>({
        queryKey: ["stores"],
        queryFn: async () => {
            return await apiClient
                .get("/stores", {
                    params: {
                        key: process.env.NEXT_PUBLIC_API_KEY,
                    },
                })
                .then((res) => res.data);
        },
    });
};
