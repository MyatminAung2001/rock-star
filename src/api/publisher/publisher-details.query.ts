import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { PublisherDetail } from "@/types/publisher";

export const fetchPublisherDetails = async (slug: string) => {
    return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/publishers/${slug}?key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());
};

export const useGetPublisherDetails = (slug: string) => {
    return useQuery<PublisherDetail>({
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
