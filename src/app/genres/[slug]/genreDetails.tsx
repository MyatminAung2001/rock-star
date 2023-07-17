"use client";

import Loading from "./loading";
import { FetchingNextPage } from "@/components/Common/Loading";
import Description from "@/components/Common/Description";
import useGenreDetails from "./useGenreDetails";
import RelatedCard from "@/components/Card/RelatedCard";

const GenreDetails = () => {
    const {
        ref,
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        genresDetail,
        description,
        formattedData,
    } = useGenreDetails();

    if (isLoading) return <Loading />;

    if (isError) return <p>Error...</p>;

    return (
        <div className="default-section-padding">
            <div className="mb-5">
                <p className="heading mb-5">{genresDetail?.name} Games</p>
                {description && (
                    <Description description={description} title="" />
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {formattedData?.map((data) => (
                    <RelatedCard key={data.id} data={data} />
                ))}
            </div>

            <div ref={ref}>
                {hasNextPage ? (
                    isFetchingNextPage && <FetchingNextPage />
                ) : (
                    <p className="text-white text-center mt-3">
                        No More Results
                    </p>
                )}
            </div>
        </div>
    );
};

export default GenreDetails;
