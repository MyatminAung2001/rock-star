import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useInView } from "react-intersection-observer";

import { useGetGenerDetails } from "@/api/genres/genre-detail.query";
import { useGetGenreRelatedGames } from "@/api/genres/genre-related-games.query";

const useGenreDetails = () => {
    const { slug } = useParams();

    const { ref, inView } = useInView();

    const genreDetails = useGetGenerDetails(slug);

    const genreRelatedGames = useGetGenreRelatedGames(slug, 12);

    // for loading
    const isLoading = genreDetails.isLoading || genreRelatedGames.isLoading;

    // for error
    const isError = genreDetails.isError || genreRelatedGames.isError;

    // useInfiniteQuery
    const fetchNextPage = genreRelatedGames.fetchNextPage;
    const hasNextPage = genreRelatedGames.hasNextPage;
    const isFetchingNextPage = genreRelatedGames.isFetchingNextPage;

    // access data
    const genresDetail = genreDetails.data;
    const genresRelatedGames = genreRelatedGames.data;

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

    return {
        ref,
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        genresDetail,
        description,
        formattedData,
    };
};

export default useGenreDetails;
