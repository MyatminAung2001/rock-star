import { useQuery } from "@tanstack/react-query";

import apiClient from "../apiClient";
import { CreatorDetails } from "@/types/creator";

export const fetchCreatorDetails = async (slug: string) => {
    return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/creators/${slug}?key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());
};

export const useGetCreatorDetails = (slug: string) => {
    return useQuery<CreatorDetails>({
        queryKey: ["creator-details", slug],
        queryFn: async () => {
            return await apiClient
                .get(`/creators/${slug}`, {
                    params: {
                        key: process.env.NEXT_PUBLIC_API_KEY,
                    },
                })
                .then((res) => res.data);
        },
    });
};
