"use client";

import Image from "next/image";

import Loading from "./loading";
import BackgroundImage from "@/components/Common/BackgroundImage";
import { FetchingNextPage } from "@/components/Common/Loading";
import useCreatorDetails from "./useCreatorDetails";
import Description from "@/components/Common/Description";
import RelatedCard from "@/components/Card/RelatedCard";

const CreatorDetails = () => {
    const {
        ref,
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        creatorsDetail,
        formattedData,
        description,
    } = useCreatorDetails();

    if (isLoading) return <Loading />;

    if (isError) return <p>Error...</p>;

    return (
        <div className="default-section-padding">
            <BackgroundImage
                image_background={creatorsDetail?.image_background}
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
                {description && (
                    <Description description={description} title="" />
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {formattedData?.map((data) => (
                    <RelatedCard key={data.id} data={data} />
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

export default CreatorDetails;
