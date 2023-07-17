"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

// components
import GameCard from "@/components/Card/GameCard";
import Description from "@/components/Common/Description";
import Tags from "@/components/Details/Tags";
import Platforms from "@/components/Details/Platforms";
import Genres from "@/components/Details/Genres";
import Stores from "@/components/Details/Stores";
import BackgroundImage from "@/components/Common/BackgroundImage";
import { Loading } from "@/components/Common/Loading";
import useContainer from "./useContainer";

// assets
import WebLinkIcon from "@/components/Common/icons/WebLinkIcon";
import { format } from "date-fns";

const Details = () => {
    const zoomRef = useRef(null);
    const thumbnailsRef = useRef(null);

    const [openLightbox, setOpenLightbox] = useState(false);

    const {
        isLoading,
        isError,
        hasNextPage,
        isFetchingNextPage,
        gameDetails,
        gameSeries,
        gameScreenShots,
        gameTrailers,
        gameStores,
        gameDLCAndEditions,
        formattedData,
        fetchNextPage,
    } = useContainer();

    if (isLoading) return <Loading />;

    if (isError) return <p>Error...</p>;

    return (
        <div className="default-section-padding">
            {gameDetails?.background_image && (
                <BackgroundImage
                    image_background={gameDetails?.background_image}
                />
            )}

            <div>
                <div className="flex items-start gap-x-2">
                    {gameDetails?.name && (
                        <p className="mb-2 text-2xl text-primary-white font-semibold">
                            {gameDetails.name}{" "}
                        </p>
                    )}

                    {gameDetails?.website && (
                        <Link
                            href={gameDetails.website}
                            target="__blank"
                            className="mt-3"
                        >
                            <WebLinkIcon />
                        </Link>
                    )}
                </div>

                {gameDetails?.playtime && (
                    <p className="mb-2 uppercase text-primary-white text-xs font-light tracking-wider">
                        Average Playtime: {gameDetails?.playtime} hours
                    </p>
                )}

                {gameDetails?.description_raw && (
                    <Description
                        title="About"
                        description={gameDetails?.description_raw}
                    />
                )}

                <div className="mb-2 grid grid-cols-2 gap-y-2 lg:grid-cols-4">
                    {gameDetails?.rating && gameDetails?.rating_top && (
                        <div>
                            <p className="detail-heading">Rating</p>
                            <p className="text-primary-white tracking-wide text-[14px] font-light">
                                {gameDetails.rating} / {gameDetails.rating_top}
                            </p>
                        </div>
                    )}

                    {gameDetails?.metacritic && (
                        <div>
                            <p className="detail-heading">Metacritic</p>
                            <p className="rounded w-8 text-center text-sm text-primary-yellow border border-primary-bg-yellow">
                                {gameDetails.metacritic}
                            </p>
                        </div>
                    )}

                    {gameDetails?.released && (
                        <div>
                            <p className="detail-heading">Released Date</p>
                            <p className="text-primary-white tracking-wide text-[14px] font-light">
                                {format(
                                    new Date(gameDetails.released),
                                    "dd, MMMM, yyyy"
                                )}
                            </p>
                        </div>
                    )}

                    {gameDetails?.updated && (
                        <div>
                            <p className="detail-heading">Updated Date</p>
                            <p className="text-primary-white tracking-wide text-[14px] font-light">
                                {format(
                                    new Date(gameDetails.updated),
                                    "dd, MMMM, yyyy"
                                )}
                            </p>
                        </div>
                    )}

                    {gameDetails?.developers && (
                        <div>
                            <p className="detail-heading">Developer</p>
                            {gameDetails?.developers.map(
                                (developer: any, i: any, arr: any) => (
                                    <Link
                                        key={developer.id}
                                        href={`/developers/${developer.slug}`}
                                        className="text-primary-white tracking-wide text-[14px] font-light hover:text-primary-gray transition duration-300"
                                    >
                                        {developer.name}
                                        <span className="text-primary-yellow">
                                            {i != arr.length - 1 ? " | " : " "}
                                        </span>
                                    </Link>
                                )
                            )}
                        </div>
                    )}

                    {gameDetails?.publishers && (
                        <div>
                            <p className="detail-heading">Publisher</p>
                            {gameDetails?.publishers.map(
                                (publisher: any, i: any, arr: any) => (
                                    <Link
                                        key={publisher.id}
                                        href={`/publishers/${publisher.slug}`}
                                        className="text-primary-white tracking-wide text-[14px] font-light hover:text-primary-gray transition duration-300"
                                    >
                                        {publisher.name}
                                        <span className="text-primary-yellow">
                                            {i != arr.length - 1 ? " | " : " "}
                                        </span>
                                    </Link>
                                )
                            )}
                        </div>
                    )}

                    {gameDetails?.genres && (
                        <Genres genres={gameDetails?.genres} />
                    )}

                    {gameDetails?.platforms && (
                        <Platforms platforms={gameDetails?.platforms} />
                    )}
                </div>

                {gameDetails?.tags && <Tags tags={gameDetails?.tags} />}

                <Stores stores={gameStores} />
            </div>

            {gameScreenShots?.results.length > 0 && (
                <div className="mb-5 xl:w-[70rem] 2xl:w-[100rem]">
                    <p className="detail-heading mb-3">
                        {gameDetails?.name} Screenshots
                    </p>
                    <Swiper
                        className="mySwiper"
                        spaceBetween={10}
                        slidesPerView={"auto"}
                    >
                        {gameScreenShots?.results.map((screenshot: any) => (
                            <SwiperSlide
                                key={screenshot.id}
                                style={{ width: "auto" }}
                            >
                                <Image
                                    src={screenshot.image}
                                    alt="screenshot"
                                    width={300}
                                    height={230}
                                    onClick={() => setOpenLightbox(true)}
                                    className="object-cover w-[300px] lg:w-[400px] h-[150px] lg:h-[230px] rounded-lg cursor-pointer"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}

            {/* ----- preview ----- */}
            <Lightbox
                plugins={[Zoom, Thumbnails]}
                open={openLightbox}
                zoom={{ ref: zoomRef }}
                thumbnails={{ ref: thumbnailsRef }}
                close={() => setOpenLightbox(false)}
                slides={gameScreenShots?.results?.map((data: any) => ({
                    src: data?.image,
                }))}
                // toolbar={["close"]}
                // on={{
                //     click: () => zoomRef.current?.zoomIn(),
                // }}
            />

            {gameDLCAndEditions?.count > 0 && (
                <div className="mb-5">
                    <p className="detail-heading mb-3">
                        {"DLC's and editions"}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                        {gameDLCAndEditions?.results.map((edition: any) => (
                            <GameCard key={edition.id} data={edition} />
                        ))}
                    </div>
                </div>
            )}

            {formattedData?.length > 0 && (
                <div className="mb-5">
                    <p className="detail-heading mb-3">
                        {gameDetails.name} achievements
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                        {formattedData?.map((achievement) => (
                            <div
                                key={achievement.id}
                                className="flex items-start gap-x-2"
                            >
                                <Image
                                    src={achievement.image}
                                    alt={achievement.name}
                                    width={50}
                                    height={50}
                                    className="object-cover w-[50px] h-[50px] rounded-md"
                                />
                                <div>
                                    <p className="text-xs text-primary-white font-light">
                                        {achievement.percent} %
                                    </p>
                                    <p className="text-sm text-primary-white">
                                        {achievement.name}
                                    </p>
                                    <p className="text-xs text-[#FFFFFF66] font-light">
                                        {achievement.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="w-[100%] flex items-center justify-center mt-5">
                        <div>
                            <button
                                type="button"
                                disabled={!hasNextPage || isFetchingNextPage}
                                onClick={() => hasNextPage && fetchNextPage()}
                                className="px-4 py-2 bg-secondary-bg-black text-primary-white font-light text-sm rounded-md"
                            >
                                {isFetchingNextPage
                                    ? "Loading more..."
                                    : hasNextPage
                                    ? "Load More"
                                    : "No More Results"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {gameSeries?.results.length > 0 && (
                <div>
                    <p className="detail-heading mb-5">
                        Other games in the series
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                        {gameSeries?.results.map((series: any) => (
                            <GameCard key={series.id} data={series} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Details;
