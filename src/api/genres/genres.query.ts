import { useQuery } from "@tanstack/react-query";

import apiClient from "../apiClient";
import { Genre } from "@/types/genre";

export const useGetGenres = () => {
    return useQuery<Genre>({
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
