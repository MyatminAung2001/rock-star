import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useInView } from "react-intersection-observer";

import { useGetPlatforms } from "@/api/platform/platform.query";

const usePlatforms = () => {
    const router = useRouter();

    const { ref, inView } = useInView();

    const {
        data,
        isLoading,
        isError,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    } = useGetPlatforms(12);

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
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        formattedData,
        ref,
    };
};

export default usePlatforms;
