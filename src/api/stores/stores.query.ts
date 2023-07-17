import { useQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Store } from "@/types/store";

export const useGetStores = () => {
    return useQuery<Store>({
        queryKey: ["stores"],
        queryFn: async () => {
            return await apiClient
                .get("/stores", {
                    params: {
                        key: process.env.NEXT_PUBLIC_API_KEY,
                    },
                })
                .then((res) => res.data);
        },
    });
};
