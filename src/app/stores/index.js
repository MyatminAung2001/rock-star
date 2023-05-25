"use client";

import { StoreIcon } from "@/components/Common/icons/StoreIcon";
import Card from "@/components/Common/Card";
import { Loading } from "@/components/Common/Loading";
import useContainer from "./useContainer";

const Stores = () => {
    const { router, isLoading, isError, stores } = useContainer();

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
                {stores?.results?.map((data) => (
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
