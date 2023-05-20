import Link from "next/link";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
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
                    <div className="bg-[#212529] rounded-xl flex flex-col h-full w-[300px] lg:w-[370px]">
                        <LazyLoadImage
                            src={data.background_image}
                            alt="screenshot"
                            effect="blur"
                            threshold={50}
                            className="object-cover w-full h-[180px] lg:h-[230px] rounded-t-lg"
                        />
                        <Link
                            href={`/games/${data.slug}`}
                            className="py-1 px-4 w-auto text-primary-white text-xl font-semibold line-clamp-2 transition hover:text-primary-yellow duration-300 cursor-pointer"
                        >
                            {data.name}
                        </Link>
                        <div className="px-4 pb-2 mt-auto flex flex-col">
                            <div className="mb-2 flex items-center justify-between">
                                <p className="text-secondary-gray text-sm">
                                    Release date
                                </p>
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

                            <div className="mb-2 bg-primary-bg-grey w-[100%] h-[0.5px]" />

                            <div className="flex items-center justify-between">
                                <p className="text-secondary-gray text-sm">
                                    Genres
                                </p>
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
