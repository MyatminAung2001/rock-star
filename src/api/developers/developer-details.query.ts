import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { DeveloperDetails } from "@/types/developer";

export const fetchDeveloperDetails = async (slug: string) => {
    return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/developers/${slug}?key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());
};

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
