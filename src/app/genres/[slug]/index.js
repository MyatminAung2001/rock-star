"use client";

import GameCard from "@/components/Common/GameCard";
import { FetchingNextPage, Loading } from "@/components/Common/Loading";
import useContainer from "./useContainer";

const Detail = () => {
    const {
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
        isFetching,
        formattedData,
    } = useContainer();

    if (isLoading) return <Loading />;

    return (
        <div className="px-4 pt-20 pb-5">
            <div className="mb-5">
                <p className="heading mb-5">{genresDetail?.name} Games</p>
                <p className="text-primary-white text-[16px] font-light">
                    {displayContent}...{" "}
                    {!showFullContent && description?.length > cutOff && (
                        <button
                            onClick={() => setShowFullContent(true)}
                            className="text-[12px] bg-primary-bg-white text-primary-bg-black px-2 rounded"
                        >
                            read more
                        </button>
                    )}
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {formattedData?.map((data) => (
                    <div key={data.id} ref={ref}>
                        <GameCard data={data} />
                    </div>
                ))}
            </div>
            {isFetchingNextPage && <FetchingNextPage />}
        </div>
    );
};

export default Detail;
