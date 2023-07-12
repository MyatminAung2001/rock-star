import Link from "next/link";

interface Props {
    platforms: {
        platform: {
            id: number;
            name: string;
            slug: string;
            image: null;
            year_end: null;
            year_start: number;
            games_count: number;
            image_background: string;
        };
        released_at: string;
        requirements: object;
    }[];
}

const Platforms = ({ platforms }: Props) => {
    return (
        <div className="mb-3">
            <p className="detail-heading">Platforms</p>
            <div className="flex flex-wrap gap-x-1 break-words">
                {platforms?.map((platform, i, arr) => (
                    <Link
                        key={platform.platform.id}
                        href={`/platforms/${platform.platform.id}`}
                        className="text-primary-white tracking-wide text-[14px] font-light cursor-pointer hover:text-primary-gray transition duration-300"
                    >
                        {platform.platform.name}
                        <span className="text-primary-yellow">
                            {i != arr.length - 1 ? " | " : " "}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Platforms;
