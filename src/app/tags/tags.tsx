"use client";

import Loading from "./loading";
import useTags from "./useTags";
import OtherCard from "@/components/Card/OtherCard";
import { TagIcon } from "@/components/Common/icons/TagIcon";
import { FetchingNextPage } from "@/components/Common/Loading";

const Tags = () => {
    const {
        router,
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        formattedData,
        ref,
    } = useTags();

    if (isLoading) return <Loading />;

    if (isError) return <p>Error...</p>;

    return (
        <div className="default-section-padding">
            <div className="flex items-center justify-center lg:justify-start gap-x-2 mb-5">
                <div className="lg:hidden">
                    <TagIcon />
                </div>
                <header className="heading">Tags</header>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {formattedData?.map((data) => (
                    <div
                        key={data.id}
                        onClick={() => router.push(`tags/${data.id}`)}
                    >
                        <OtherCard data={data} />
                    </div>
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

export default Tags;
