import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { DeveloperDetails } from "@/types/developer";

export const useGetDeveloperDetails = (slug: string) => {
    return useQuery<DeveloperDetails>({
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
