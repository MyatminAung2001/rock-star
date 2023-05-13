import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";

import { getTagsGames, getTagsDetails } from "@/services/service.tags";

const useContainer = () => {
    const { slug } = useParams();

    const { ref, inView } = useInView();

    const {
        isLoading,
        isError,
        data: tagsDetail,
    } = useQuery("tags-detail", () => getTagsDetails(slug));

    const [page, setPage] = useState(1);

    const {
        data: tagGames,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
        isFetching,
    } = useInfiniteQuery(
        "tags-games",
        ({ pageParam = 1 }) => getTagsGames(slug, pageParam),
        {
            getNextPageParam: (lastPage) => {
                if (lastPage.length === 0) {
                    return undefined;
                }
                return page + 1;
            },
        }
    );

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
            setPage(page + 1);
        }
    }, [inView, hasNextPage, isFetchingNextPage, page, fetchNextPage]);

    const gamesData = (tagGames?.pages || []).flatMap(
        (page) => page.results || []
    );
    const formattedData = gamesData || [];

    return {
        ref,
        isLoading,
        isError,
        tagsDetail,
        isFetchingNextPage,
        isFetching,
        formattedData,
    };
};

export default useContainer;
