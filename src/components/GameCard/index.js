import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import StarIcon from "@/assets/icons/StarIcon";
import { NUMBER_OF_GENRES } from "@/constants/restrict";

const GameCard = ({ data }) => {
    return (
        <div className="bg-[#212529] h-full rounded-xl flex flex-col">
            <LazyLoadImage
                src={data.background_image}
                alt={data.name}
                effect="blur"
                threshold={50}
                className="object-cover w-[100%] h-[230px] rounded-t-xl"
            />
            <div className="pt-2 px-4 w-[100%] flex items-start justify-between">
                <p className="text-primary-white text-xl font-semibold w-[220px] line-clamp-2">
                    {data.name}
                </p>
                {data.metacritic && (
                    <p className="px-2 rounded mt-1 text-sm text-primary-yellow border border-primary-bg-yellow">
                        {data.metacritic}
                    </p>
                )}
            </div>
            <div className="pt-1 pb-2 px-4 mt-auto">
                <div className="mb-2 flex items-center justify-between">
                    <p className="text-secondary-gray text-sm">
                        Release date
                    </p>
                    <p className="text-primary-white text-sm font-light">
                        {new Date(data.released).toLocaleDateString("en-us", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
                <div className="mb-2 bg-primary-bg-grey w-[100%] h-[0.5px]" />
                <div className="mb-2 flex items-center justify-between">
                    <p className="text-secondary-gray text-sm">
                        Total rating
                    </p>
                    <div className="flex items-center gap-x-1">
                        <StarIcon />
                        <p className="text-primary-white text-sm font-light">
                            {data.ratings_count}
                        </p>
                    </div>
                </div>
                <div className="mb-2 bg-primary-bg-grey w-[100%] h-[0.5px]" />
                <div className="flex items-center justify-between">
                    <p className="text-secondary-gray text-sm">
                        Genres
                    </p>
                    <div className="flex items-center gap-x-1">
                        {data?.genres?.slice(0, NUMBER_OF_GENRES).map((data) => (
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
    );
}

export default GameCard;