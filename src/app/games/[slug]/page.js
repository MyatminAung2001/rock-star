"use client"

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useQueries } from "react-query";
import { RotatingLines } from "react-loader-spinner";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { getGameDetails, getGameSeries, getScreenShots, getTrailers } from "@/services/service.details";
import GameCard from "@/components/GameCard";
import Description from "@/components/common/Description";
import Tags from "@/components/Details/Tags";
import Platforms from "@/components/Details/Platforms";
import Genres from "@/components/Details/Genres";

const Page = () => {

    const { slug } = useParams();

    const router = useRouter();

    const queryResults = useQueries([
        { queryKey: "details", queryFn: () => getGameDetails(slug) },
        { queryKey: "series", queryFn: () => getGameSeries(slug) },
        { queryKey: "screenshots", queryFn: () => getScreenShots(slug) },
        { queryKey: "trailers", queryFn: () => getTrailers(slug) },
    ]);

    // loading
    const isLoading = queryResults.some(result => result.isLoading);

    if (isLoading) {
        return (
            <div className="w-[100%] h-screen flex items-center justify-center"> 
                <RotatingLines
                    strokeColor="#B7B5B3"
                    strokeWidth="2"
                    animationDuration="0.75"
                    width="50"
                    visible={true}
                />
            </div>
        )
    };

    const gameDetails = queryResults[0].data;

    const gameSeries = queryResults[1].data;

    const gameScreenShots = queryResults[2].data;

    const gameTrailers = queryResults[3].data;

    // console.log(queryResults[0].data);

    // console.log(gameSeries?.results);

    // console.log(gameScreenShots);

    // console.log("trailer", gameTrailers);

    return (
        <div className="default-section-padding">
            <span style={{
                content: "",
                backgroundImage: `
                    linear-gradient(rgba(21, 21, 21, 0), rgb(21, 21, 21)),
                    linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)),
                    url(${gameDetails?.background_image})
                `,
                backgroundSize: "cover",
                backgroundPosition: "top",
                backgroundColor: "transparent",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                zIndex: "-10",
                inset: "0",
                height: "500px",
                maxHeight: "100%"
            }} />
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
                                {new Date(gameDetails.released).toLocaleDateString("en-us", {
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
                                {new Date(gameDetails.updated).toLocaleDateString("en-us", {
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
                        {gameDetails?.developers.map(developer => (
                            <p key={developer.id} className="text-primary-white tracking-wide text-[14px] font-light">
                                {developer.name}
                            </p>
                        ))}
                    </div>
                    <div className="w-[50%] xl:w-[20%]">
                        <p className="text-primary-white text-lg tracking-wide">
                            Publisher     
                        </p>
                        {gameDetails?.publishers.map(publisher => (
                            <p key={publisher.id} className="text-primary-white tracking-wide text-[14px] font-light">
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
            </div>
            <div className="mb-5 xl:w-[70rem] 2xl:w-[100rem]">
                <p className="text-xl text-primary-white mb-3">
                    {gameDetails?.name} Screenshots
                </p>
                <Swiper 
                    className="mySwiper"
                    spaceBetween={10}
                    slidesPerView={'auto'}
                >
                    {gameScreenShots?.results.map(screenshot => (
                        <SwiperSlide key={screenshot.id} style={{ width: "auto" }}>
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
            {}
            {gameSeries?.results.length > 0 && (
                <div>
                    <p className="text-xl text-primary-white mb-3">
                        Other games in the series
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                        {gameSeries?.results.map(series => (
                            <div key={series.id} onClick={() => router.push(`games/${series.slug}`)}>
                                <GameCard data={series} />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Page;