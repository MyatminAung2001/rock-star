import Link from "next/link";

interface Props {
    tags: {
        games_count: number;
        id: number;
        image_background: string;
        language: string;
        name: string;
        slug: string;
    }[];
}

const Tags = ({ tags }: Props) => {
    return (
        <div className="mb-2">
            <p className="detail-heading mb-3">Tags</p>
            <div className="flex flex-wrap gap-2 break-words">
                {tags.map((tag) => (
                    <Link
                        href={`/tags/${tag.slug}`}
                        key={tag.id}
                        className="text-[14px] border rounded px-2 text-primary-white hover:text-secondary-gray transition duration-300 border-primary-bg-grey cursor-pointer"
                    >
                        {tag.name}
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Tags;
