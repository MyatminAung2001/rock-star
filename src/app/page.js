"use client";

import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import useContainer from "./useContainer";
import { NUMBER_OF_GENRES } from "@/constants/restrict";

const Page = () => {
    const { UpcomingGames, isError, isLoading } = useContainer();

    console.log("UpcomingGames", UpcomingGames?.results);

    return (
        <div className="mb-5 xl:w-[70rem] 2xl:w-[100rem] default-section-padding">
            <div>
                <p className="heading mb-3">Upcoming Games</p>
                <Swiper
                    className="mySwiper games-card"
                    spaceBetween={10}
                    slidesPerView={"auto"}
                >
                    {UpcomingGames?.results.map((data) => (
                        <SwiperSlide key={data.id} style={{ width: "auto" }}>
                            <div className="bg-[#212529] rounded-xl flex flex-col h-full">
                                <LazyLoadImage
                                    src={data.background_image}
                                    alt="screenshot"
                                    effect="blur"
                                    threshold={50}
                                    className="object-cover w-[300px] lg:w-[370px] h-[180px] lg:h-[230px] rounded-t-lg"
                                />
                                <Link
                                    href={`/games/${data.slug}`}
                                    className="pt-2 px-4 w-[300px] lg:w-[370px] text-primary-white text-xl font-semibold line-clamp-2 transition hover:text-primary-yellow duration-300 cursor-pointer"
                                >
                                    {data.name}
                                </Link>
                                <div className="px-4 pb-2 mt-auto flex flex-col">
                                    <div className="mb-2 flex items-center justify-between">
                                        <p className="text-secondary-gray text-sm">
                                            Release date
                                        </p>
                                        <p className="text-primary-white text-sm font-light">
                                            {new Date(
                                                data.released
                                            ).toLocaleDateString("en-us", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </p>
                                    </div>

                                    <div className="mb-2 bg-primary-bg-grey w-[100%] h-[0.5px]" />

                                    <div className="flex items-center justify-between">
                                        <p className="text-secondary-gray text-sm">
                                            Genres
                                        </p>
                                        <div className="flex items-center gap-x-1">
                                            {data?.genres
                                                ?.slice(0, NUMBER_OF_GENRES)
                                                .map((data) => (
                                                    <p
                                                        key={data.id}
                                                        className="text-primary-white text-sm font-light underline"
                                                    >
                                                        {data.name}
                                                    </p>
                                                ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default Page;
