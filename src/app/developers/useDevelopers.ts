import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";
import { useGetDevelopers } from "@/api/developers/developer.query";

const useDevelopers = () => {
    const router = useRouter();

    const { ref, inView } = useInView();

    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useGetDevelopers(12);

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    const gamesData = (data?.pages || []).flatMap((page) => page.results || []);
    const formattedData = gamesData || [];

    return {
        router,
        ref,
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        formattedData,
    };
};

export default useDevelopers;
