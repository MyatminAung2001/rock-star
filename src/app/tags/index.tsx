"use client";

import { TagIcon } from "@/components/Common/icons/TagIcon";
import Card from "@/components/Common/Card";
import { FetchingNextPage } from "@/components/Common/Loading";
import Loading from "./loading";
import useContainer from "./useContainer";

const Tags = () => {
    const {
        router,
        ref,
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        formattedData,
    } = useContainer();

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
                        <Card data={data} />
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
