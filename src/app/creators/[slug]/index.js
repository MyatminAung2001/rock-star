"use client"

import Image from "next/image";

import GameCard from "@/components/Common/GameCard";
import { FetchingNextPage, Loading } from "@/components/Common/Loading";
import useContainer from "./useContainer";

const Details = () => {

    const {
        ref,
        isLoading,
        isError,
        isFetchingNextPage,
        creatorsDetail,
        formattedData,
        description
    } = useContainer();

    if (isLoading) return <Loading />

    return (
        <div className="default-section-padding">
            <span
                style={{
                content: "",
                backgroundImage: `
                    linear-gradient(rgba(21, 21, 21, 0), rgb(21, 21, 21)),
                    linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)),
                    url(${creatorsDetail.image_background})
                `,
                backgroundSize: "cover",
                backgroundPosition: "top",
                backgroundColor: "transparent",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                zIndex: "-10",
                inset: "0",
                height: "500px",
                maxHeight: "100%",
                }}
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
                                    {data.name} {i != arr.length - 1 ? ", " : " "}
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
                    <div key={data.id} ref={ref}>
                        <GameCard data={data} />
                    </div>
                ))}
            </div>
            {isFetchingNextPage && <FetchingNextPage />}
        </div>
    );
}

export default Details;