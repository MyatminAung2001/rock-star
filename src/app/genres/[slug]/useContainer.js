import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { getGenresDetails, getGenresGames } from "@/services/service.genres";

const useContainer = () => {
    const { slug } = useParams();

    const { ref, inView } = useInView();

    const query = useQuery({
        queryKey: ["genres-detail", slug],
        queryFn: () => getGenresDetails(slug),
    });

    const infiniteQuery = useInfiniteQuery({
        queryKey: ["genres-games", slug],
        queryFn: ({ pageParam = 1 }) => getGenresGames({ slug, pageParam }),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.next === null) return undefined;
            return allPages.length + 1;
        },
        keepPreviousData: true,
    });

    // for loading
    const isLoading = query.isLoading || infiniteQuery.isLoading;

    // for error
    const isError = query.isError || infiniteQuery.isError;

    // useInfiniteQuery
    const fetchNextPage = infiniteQuery.fetchNextPage;
    const hasNextPage = infiniteQuery.hasNextPage;
    const isFetchingNextPage = infiniteQuery.isFetchingNextPage;

    // access data
    const genresDetail = query.data;
    const genresRelatedGames = infiniteQuery.data;

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    const gamesData = (genresRelatedGames?.pages || []).flatMap(
        (page) => page.results || []
    );
    const formattedData = gamesData || [];

    // content
    // remove p tag from a string
    const myString = genresDetail?.description;
    const description = myString?.replace(/<p>|<\/p>/gi, "");

    // control read more state
    const [showFullContent, setShowFullContent] = useState(false);

    const cutOff = 200;

    const displayContent =
        description?.length <= cutOff || showFullContent
            ? description
            : `${description?.substring(0, cutOff)}`;

    return {
        ref,
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        genresDetail,
        showFullContent,
        setShowFullContent,
        displayContent,
        description,
        cutOff,
        formattedData,
    };
};

export default useContainer;
