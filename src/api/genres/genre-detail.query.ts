import { useQuery } from "@tanstack/react-query";

import apiClient from "../apiClient";
import { GenreDetails } from "@/types/genre";

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
