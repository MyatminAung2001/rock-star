"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";

import { getPlatforms } from "@/services/service.platform";
import Card from "@/components/Card";
import { ConsoleIcon } from "@/assets/icons/ConsoleIcon";

const Genres = () => {

    const router = useRouter();

    const { isLoading, isError, data: platforms } = useQuery("platforms", getPlatforms);

    if (isLoading) {
        return (
            <div className="w-screen h-screen flex items-center justify-center"> 
                <RotatingLines
                    strokeColor="#B7B5B3"
                    strokeWidth="2"
                    animationDuration="0.75"
                    width="50"
                    visible={true}
                />
            </div>
        )
    }

    return (
        <div className="default-section-padding w-[100%]">
            <div className="flex items-center justify-center gap-x-2 mb-5">
                <ConsoleIcon />
                <header className="heading">
                    Platforms
                </header>
            </div>
            <div className="grid grid-cols-1 gap-y-5">
                {platforms?.results?.map((data) => (
                    <div key={data.id} onClick={() => router.push(`platforms/${data.id}`)}>
                        <Card data={data} />
                    </div>
                ))}
            </div>
        </div>
  );
};

export default Genres;
