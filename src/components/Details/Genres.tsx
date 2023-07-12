"use client";

import Link from "next/link";

interface Props {
    genres: {
        games_count: number;
        id: number;
        image_background: string;
        name: string;
        slug: string;
    }[];
}

const Genres = ({ genres }: Props) => {
    return (
        <div className="mb-3">
            <p className="detail-heading">Genres</p>
            <div className="flex flex-wrap gap-x-1 break-words">
                {genres.map((genre, i, arr) => (
                    <Link
                        key={genre.id}
                        href={`/genres/${genre.slug}`}
                        className="text-primary-white tracking-wide text-[14px] font-light cursor-pointer hover:text-primary-gray transition duration-300"
                    >
                        {genre.name}
                        <span className="text-primary-yellow">
                            {i != arr.length - 1 ? " | " : " "}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Genres;
