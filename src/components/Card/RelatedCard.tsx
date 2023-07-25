import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

import StarIcon from "@/components/Common/icons/StarIcon";
import { CardRestrict } from "@/constants/restrict";
import { RelatedGameData } from "@/types/games";

interface Props {
    data: RelatedGameData;
}

const RelatedCard = ({ data }: Props) => {
    return (
        <div className="bg-card-bg-color h-full rounded-xl flex flex-col w-[100%]">
            {data.background_image && (
                <Image
                    src={data.background_image}
                    alt={data.name}
                    width={300}
                    height={300}
                    className="w-full h-[230px] rounded-t-lg object-cover"
                />
            )}
            <div className="pt-2 px-4 w-full flex items-start justify-between gap-x-2">
                <Link href={`/games/${data.slug}`} className="game-title">
                    {data.name}
                </Link>
                {data.metacritic && (
                    <p className="px-2 rounded mt-1 text-sm text-primary-yellow border border-primary-bg-yellow">
                        {data.metacritic}
                    </p>
                )}
            </div>
            <div className="pt-1 pb-2 px-4 mt-auto">
                <div className="mb-2 flex items-center justify-between">
                    <p className="game-heading">Release date</p>
                    <p className="text-primary-white text-sm font-light">
                        {format(new Date(data.released), "dd, MMMM, yyyy")}
                    </p>
                </div>

                <div className="divider" />

                <div className="mb-2 flex items-center justify-between">
                    <p className="game-heading">Total rating</p>
                    <div className="flex items-center gap-x-1">
                        <StarIcon />
                        <p className="text-primary-white text-sm font-light">
                            {data.ratings_count}
                        </p>
                    </div>
                </div>

                <div className="divider" />

                <div className="flex items-center justify-between">
                    <p className="game-heading">Genres</p>
                    <div className="flex items-center gap-x-1">
                        {data?.genres
                            ?.slice(0, CardRestrict.NumberOfGenres)
                            .map((data, i, arr) => (
                                <p
                                    key={data.id}
                                    className="text-primary-white text-sm font-light"
                                >
                                    {data.name}
                                    <span className="text-primary-yellow">
                                        {i !== arr.length - 1 ? " | " : " "}
                                    </span>
                                </p>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RelatedCard;
