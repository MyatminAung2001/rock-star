import { useQuery } from "@tanstack/react-query";

import apiClient from "../apiClient";
import { TagDetails } from "@/types/tag";

export const fetchTagDetails = async (slug: string) => {
    return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/tags/${slug}?key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());
};

export const useGetTagDetails = (slug: string) => {
    return useQuery<TagDetails>({
        queryKey: ["tag-details", slug],
        queryFn: async () => {
            return await apiClient
                .get(`/tags/${slug}`, {
                    params: {
                        key: process.env.NEXT_PUBLIC_API_KEY,
                    },
                })
                .then((res) => res.data);
        },
    });
};
