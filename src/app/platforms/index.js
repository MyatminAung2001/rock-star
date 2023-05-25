"use client";

import { ConsoleIcon } from "@/components/Common/icons/ConsoleIcon";
import { Loading } from "@/components/Common/Loading";
import Card from "@/components/Common/Card";
import useContainer from "./useContainer";

const Platforms = () => {
    const { router, isLoading, isError, platforms } = useContainer();

    if (isLoading) return <Loading />;

    if (isError) return <p>Error...</p>;

    return (
        <div className="default-section-padding">
            <div className="flex items-center justify-center lg:justify-start gap-x-2 mb-5">
                <div className="lg:hidden">
                    <ConsoleIcon />
                </div>
                <header className="heading">Platforms</header>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {platforms?.results?.map((data) => (
                    <div
                        key={data.id}
                        onClick={() => router.push(`platforms/${data.id}`)}
                    >
                        <Card data={data} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Platforms;
