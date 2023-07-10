import Link from "next/link";

const Platforms = ({ platforms }) => {
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
