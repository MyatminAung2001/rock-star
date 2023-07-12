import { useQuery } from "@tanstack/react-query";

import apiClient from "../apiClient";

type GenresResponse = {
    count: number;
    next: null;
    previous: null;
    results: {
        id: number;
        name: string;
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

export const useGetGenres = () => {
    return useQuery<GenresResponse>({
        queryKey: ["genres"],
        queryFn: async () => {
            return await apiClient
                .get("/genres", {
                    params: {
                        key: process.env.NEXT_PUBLIC_API_KEY,
                    },
                })
                .then((res) => res.data);
        },
    });
};
