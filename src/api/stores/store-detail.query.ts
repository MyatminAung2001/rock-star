import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { StoreDetails } from "@/types/store";

export const useGetStoreDetails = (id: string) => {
    return useQuery<StoreDetails>({
        queryKey: ["stores-detail", id],
        queryFn: async () => {
            return await apiClient
                .get(`/stores/${id}`, {
                    params: {
                        key: process.env.NEXT_PUBLIC_API_KEY,
                    },
                })
                .then((res) => res.data);
        },
    });
};
