"use client";

import Loading from "./loading";
import useStores from "./useStores";
import Card from "@/components/Common/Card";
import { StoreIcon } from "@/components/Common/icons/StoreIcon";

const Stores = () => {
    const { router, isLoading, isError, data } = useStores();

    if (isLoading) return <Loading />;

    if (isError) return <p>Error...</p>;

    return (
        <div className="default-section-padding">
            <div className="flex items-center justify-center lg:justify-start gap-x-2 mb-5">
                <div className="lg:hidden">
                    <StoreIcon />
                </div>
                <header className="heading">Stores</header>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {data?.results?.map((data) => (
                    <div
                        key={data.id}
                        onClick={() => router.push(`stores/${data.id}`)}
                    >
                        <Card data={data} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Stores;
