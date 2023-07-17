import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { PublisherDetail } from "@/types/publisher";

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
