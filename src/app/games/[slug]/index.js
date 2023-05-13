"use client";

import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// components
import GameCard from "@/components/Common/GameCard";
import Description from "@/components/Common/Description";
import Tags from "@/components/Details/Tags";
import Platforms from "@/components/Details/Platforms";
import Genres from "@/components/Details/Genres";
import Stores from "@/components/Details/Stores";
import Achievements from "@/components/Details/Achievements";
import BackgroundImage from "@/components/Common/BackgroundImage";
import { Loading } from "@/components/Common/Loading";
import useContainer from "./useContainer";

const Details = () => {
    const {
        slug,
        router,
        isLoading,
        gameDetails,
        gameSeries,
        gameScreenShots,
        gameTrailers,
        gameStores,
        gameDLCAndEditions,
    } = useContainer();

    if (isLoading) return <Loading />;

    return (
        <div className="default-section-padding">
            <BackgroundImage image_background={gameDetails?.background_image} />

            <div>
                <p className="mb-2 text-2xl text-primary-white font-semibold">
                    {gameDetails?.name}
                </p>
                <p className="mb-2 uppercase text-primary-white text-xs font-light tracking-wider">
                    Average Playtime: {gameDetails?.playtime} hours
                </p>
                <Description
                    title="About"
                    description={gameDetails?.description_raw}
                />
                <div className="mb-3 flex flex-wrap">
                    <div className="mb-2 w-[50%] xl:w-[20%]">
                        <p className="text-primary-white text-lg tracking-wide">
                            Rating
                        </p>
                        {gameDetails?.rating && gameDetails?.rating_top && (
                            <p className="text-primary-white tracking-wide text-[14px] font-light">
                                {gameDetails.rating} / {gameDetails.rating_top}
                            </p>
                        )}
                    </div>
                    {gameDetails?.metacritic && (
                        <div className="mb-2 w-[50%] xl:w-[20%]">
                            <p className="text-primary-white text-lg tracking-wide">
                                Metacritic
                            </p>
                            <p className="rounded w-8 text-center text-sm text-primary-yellow border border-primary-bg-yellow">
                                {gameDetails.metacritic}
                            </p>
                        </div>
                    )}
                    {gameDetails?.released && (
                        <div className="mb-2 w-[50%] xl:w-[20%]">
                            <p className="text-primary-white text-lg tracking-wide">
                                Released Date
                            </p>
                            <p className="text-primary-white tracking-wide text-[14px] font-light">
                                {new Date(
                                    gameDetails.released
                                ).toLocaleDateString("en-us", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                    )}
                    {gameDetails?.updated && (
                        <div className="mb-2 w-[50%] xl:w-[20%]">
                            <p className="text-primary-white text-lg tracking-wide">
                                Updated Date
                            </p>
                            <p className="text-primary-white tracking-wide text-[14px] font-light">
                                {new Date(
                                    gameDetails.updated
                                ).toLocaleDateString("en-us", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </p>
                        </div>
                    )}
                    <div className="w-[50%] xl:w-[20%]">
                        <p className="text-primary-white text-lg tracking-wide">
                            Developer
                        </p>
                        {gameDetails?.developers.map((developer) => (
                            <p
                                key={developer.id}
                                className="text-primary-white tracking-wide text-[14px] font-light"
                            >
                                {developer.name}
                            </p>
                        ))}
                    </div>
                    <div className="w-[50%] xl:w-[20%]">
                        <p className="text-primary-white text-lg tracking-wide">
                            Publisher
                        </p>
                        {gameDetails?.publishers.map((publisher) => (
                            <p
                                key={publisher.id}
                                className="text-primary-white tracking-wide text-[14px] font-light"
                            >
                                {publisher.name}
                            </p>
                        ))}
                    </div>
                </div>
                {gameDetails?.website && (
                    <div className="mb-3">
                        <p className="text-primary-white text-lg tracking-wide">
                            Website
                        </p>
                        <Link href={gameDetails.website} target="__blank">
                            <p className="text-primary-white tracking-wide text-[14px] font-light underline">
                                {gameDetails.website}
                            </p>
                        </Link>
                    </div>
                )}
                <Genres genres={gameDetails?.genres} />

                <Platforms platforms={gameDetails?.platforms} />

                <Tags tags={gameDetails?.tags} />

                <Stores stores={gameStores} />
            </div>

            <div className="mb-5 xl:w-[70rem] 2xl:w-[100rem]">
                <p className="text-xl text-primary-white mb-3">
                    {gameDetails?.name} Screenshots
                </p>
                <Swiper
                    className="mySwiper"
                    spaceBetween={10}
                    slidesPerView={"auto"}
                >
                    {gameScreenShots?.results.map((screenshot) => (
                        <SwiperSlide
                            key={screenshot.id}
                            style={{ width: "auto" }}
                        >
                            <LazyLoadImage
                                src={screenshot.image}
                                alt="screenshot"
                                effect="blur"
                                threshold={50}
                                className="object-cover w-[100%] h-[230px] rounded-lg"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {gameDLCAndEditions?.count > 0 && (
                <div className="mb-5">
                    <p className="text-xl text-primary-white mb-3">
                        {"DLC's and editions"}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                        {gameDLCAndEditions?.results.map((edition) => (
                            <div
                                key={edition.id}
                                onClick={() =>
                                    router.push(`games/${edition.slug}`)
                                }
                            >
                                <GameCard data={edition} />
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <Achievements slug={slug} gameDetails={gameDetails} />

            {gameSeries?.results.length > 0 && (
                <div>
                    <p className="text-xl text-primary-white mb-3">
                        Other games in the series
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                        {gameSeries?.results.map((series) => (
                            <div
                                key={series.id}
                                onClick={() =>
                                    router.push(`games/${series.slug}`)
                                }
                            >
                                <GameCard data={series} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Details;
