"use client";

import { GenreIcon } from "@/components/Common/icons/GenreIcon";
import Loading from "./loading";
import Card from "@/components/Common/Card";
import useContainer from "./useContainer";

const Genres = () => {
    const { router, isLoading, isError, genres } = useContainer();

    if (isLoading) return <Loading />;

    if (isError) return <p>Error...</p>;

    return (
        <div className="default-section-padding">
            <div className="flex items-center justify-center lg:justify-start gap-x-2 mb-5">
                <div className="lg:hidden">
                    <GenreIcon />
                </div>
                <header className="heading">Genres</header>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {genres?.results?.map((data) => (
                    <div
                        key={data.id}
                        onClick={() => router.push(`genres/${data.slug}`)}
                    >
                        <Card data={data} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Genres;
