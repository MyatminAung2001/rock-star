import { useInfiniteQuery } from "@tanstack/react-query";
import apiClient from "../apiClient";
import { Games } from "@/types/games";

// this is not prefect, but it's good enough for now
export const getAllTimeTop250 = async (
    pageParam: number,
    pageSize: number,
    filterText?: string
) => {
    return await apiClient
        .get("/games/lists/popular", {
            params: {
                key: process.env.NEXT_PUBLIC_API_KEY,
                discover: true,
                ordering: `-${filterText}`,
                page: pageParam,
                page_size: pageSize,
            },
        })
        .then((res) => res.data);
};

export const useGetAllTimeTop250 = (pageSize: number, filterText: string) => {
    return useInfiniteQuery<Games>({
        queryKey: ["all-time-top-250", filterText],
        queryFn: ({ pageParam = 1 }) =>
            getAllTimeTop250(pageParam, pageSize, filterText),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.next === null) return undefined;
            return allPages.length + 1;
        },
    });
};
