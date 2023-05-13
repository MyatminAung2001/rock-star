"use client";

import { PublishIcon } from "@/components/Common/icons/PublishIcon";
import Card from "@/components/Common/Card";
import { Loading, FetchingNextPage } from "@/components/Common/Loading";
import useContainer from "./useContainer";

const Publishers = () => {
    const {
        router,
        ref,
        isLoading,
        isError,
        isFetchingNextPage,
        formattedData,
    } = useContainer();

    if (isLoading) return <Loading />;

    return (
        <div className="default-section-padding w-[100%]">
            <div className="flex items-center justify-center lg:justify-start gap-x-2 mb-5">
                <div className="lg:hidden">
                    <PublishIcon />
                </div>
                <header className="heading">Publishers</header>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {formattedData?.map((data) => (
                    <div
                        key={data.id}
                        ref={ref}
                        onClick={() => router.push(`publishers/${data.id}`)}
                    >
                        <Card data={data} />
                    </div>
                ))}
            </div>
            {isFetchingNextPage && <FetchingNextPage />}
        </div>
    );
};

export default Publishers;
