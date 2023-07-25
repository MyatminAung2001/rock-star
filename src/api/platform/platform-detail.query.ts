import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { PlatformDetails } from "@/types/platform";

export const fetchPlatformDetails = async (id: string) => {
    return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/platforms/${id}?key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());
};

export const useGetPlatformDetails = (id: string) => {
    return useQuery<PlatformDetails>({
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
