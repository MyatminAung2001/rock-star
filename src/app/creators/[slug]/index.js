"use client";

import Image from "next/image";
import Link from "next/link";

import BackgroundImage from "@/components/Common/BackgroundImage";
import GameCard from "@/components/Common/GameCard";
import { FetchingNextPage, Loading } from "@/components/Common/Loading";
import useContainer from "./useContainer";

const Details = () => {
    const {
        ref,
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        creatorsDetail,
        formattedData,
        description,
    } = useContainer();

    if (isLoading) return <Loading />;

    return (
        <div className="default-section-padding">
            <BackgroundImage
                image_background={creatorsDetail.image_background}
            />

            <div className="mb-5">
                <div className="flex flex-col items-center lg:items-start">
                    {creatorsDetail?.image && (
                        <Image
                            src={creatorsDetail.image}
                            alt={creatorsDetail?.name}
                            width={90}
                            height={90}
                            className="rounded-full mb-5"
                        />
                    )}
                    <p className="heading mb-2">{creatorsDetail?.name}</p>
                    {creatorsDetail?.positions && (
                        <div className="flex items-center justify-center gap-x-2 mb-5">
                            {creatorsDetail?.positions.map((data, i, arr) => (
                                <p
                                    key={data.id}
                                    className="text-white text-lg first-letter:uppercase font-light"
                                >
                                    {data.name}{" "}
                                    {i != arr.length - 1 ? ", " : " "}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
                <p className="text-primary-white text-[14px] lg:text-[16px] font-light">
                    {description}
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {formattedData?.map((data) => (
                    <GameCard key={data.id} data={data} />
                ))}
            </div>

            <div ref={ref}>
                {/* {isFetchingNextPage && <FetchingNextPage />} */}
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

export default Details;
