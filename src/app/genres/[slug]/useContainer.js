import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useInView } from "react-intersection-observer";

import { getGenresDetails, getGenresGames } from "@/services/service.genres";

const useContainer = () => {
    const { slug } = useParams();

    const { ref, inView } = useInView();

    const { data: genresDetail } = useQuery({
        queryKey: ["genres-detail"],
        queryFn: () => getGenresDetails(slug),
    });

    const {
        data: genresGames,
        isError,
        isLoading,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ["genres-games"],
        queryFn: ({ pageParam }) => getGenresGames({ slug, pageParam }),
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length === 0) return undefined;
            return allPages.length + 1;
        },
        keepPreviousData: true,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

    const gamesData = (genresGames?.pages || []).flatMap(
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
        genresDetail,
        showFullContent,
        setShowFullContent,
        displayContent,
        description,
        cutOff,
        isFetchingNextPage,
        formattedData,
    };
};

export default useContainer;
