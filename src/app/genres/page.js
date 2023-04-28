"use client";

import { Fragment } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

import { getGenres } from "@/services/service.genres";
import Card from "@/components/card";

// icons
import GenreIcon from "@/assets/icons/GenreIcon";

const Genres = () => {

    const router = useRouter();

    const { isLoading, isError, data: genresData } = useQuery("genres", getGenres);

    return (
        <div className="default-section-padding w-[100%]">
            <div className="flex items-center justify-center gap-x-2 mb-5">
                <GenreIcon />
                <header className="heading">Genres</header>
            </div>
            <div className="grid grid-cols-1 gap-y-5">
                {genresData?.results?.map((data) => (
                    <div key={data.id} onClick={() => router.push(`genres/${data.slug}`)}>
                        <Card data={data} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Genres;
