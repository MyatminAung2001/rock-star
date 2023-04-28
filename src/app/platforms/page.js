"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

import { getPlatforms } from "@/services/service.platform";
import Card from "@/components/card";

// icons
import ConsoleIcon from "@/assets/icons/ConsoleIcon";
import { Fragment } from "react";

const Genres = () => {

    const router = useRouter();

    const { isLoading, isError, data: platformsData } = useQuery("platforms", getPlatforms);

    console.log(platformsData);

    return (
        <div className="default-section-padding w-[100%]">
            <div className="flex items-center justify-center gap-x-2 mb-5">
                <ConsoleIcon />
                <header className="heading">Platforms</header>
            </div>
            <div className="grid grid-cols-1 gap-y-5">
                {platformsData?.results?.map((data) => (
                    <div key={data.id} onClick={() => router.push(`platforms/${data.slug}`)}>
                        <Card data={data} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Genres;