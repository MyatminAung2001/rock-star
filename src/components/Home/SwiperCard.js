import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { NUMBER_OF_GENRES } from "@/constants/restrict";

const SwiperCard = ({ gamesData }) => {
    return (
        <Swiper
            className="mySwiper games-card"
            spaceBetween={10}
            slidesPerView={"auto"}
        >
            {gamesData.map((data) => (
                <SwiperSlide key={data.id} style={{ width: "auto" }}>
                    <div className="bg-card-bg-color rounded-xl flex flex-col h-full w-[300px] lg:w-[350px]">
                        {data.background_image && (
                            <Image
                                src={data.background_image}
                                alt={data.name}
                                width={350}
                                height={180}
                                className="object-cover w-full h-[180px] lg:h-[230px] rounded-t-lg"
                            />
                        )}
                        <Link
                            href={`/games/${data.slug}`}
                            className="px-4 pt-2 w-auto game-title"
                        >
                            {data.name}
                        </Link>
                        <div className="px-4 pt-1 pb-2 mt-auto flex flex-col">
                            <div className="mb-2 flex items-center justify-between">
                                <p className="game-heading">Release date</p>
                                <p className="text-primary-white text-sm font-light">
                                    {new Date(data.released).toLocaleDateString(
                                        "en-us",
                                        {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        }
                                    )}
                                </p>
                            </div>

                            <div className="divider" />

                            <div className="flex items-center justify-between">
                                <p className="game-heading">Genres</p>
                                <div className="flex items-center gap-x-1">
                                    {data?.genres
                                        ?.slice(0, NUMBER_OF_GENRES)
                                        .map((data, i, arr) => (
                                            <p
                                                key={data.id}
                                                className="text-primary-white text-sm font-light"
                                            >
                                                {data.name}
                                                <span className="text-primary-yellow">
                                                    {i !== arr.length - 1
                                                        ? " | "
                                                        : " "}
                                                </span>
                                            </p>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default SwiperCard;
