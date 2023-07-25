import { useQuery } from "@tanstack/react-query";

import apiClient from "../apiClient";
import { GenreDetails } from "@/types/genre";

export const fetchGenreDetails = async (slug: string) => {
    return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/genres/${slug}?key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());
};

export const useGetGenerDetails = (slug: string) => {
    return useQuery<GenreDetails>({
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
