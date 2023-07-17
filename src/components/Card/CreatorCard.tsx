import Image from "next/image";

interface Props {
    data: {
        id: number;
        name: string;
        slug: string;
        image: string;
        image_background: string;
        games_count: number;
        positions: {
            id: number;
            name: string;
            slug: string;
        }[];
        games: {
            id: number;
            slug: string;
            name: string;
            added: number;
        }[];
    };
}

const CreatorCard = ({ data }: Props) => {
    return (
        <div key={data.id} className="w-[100%] bg-card-bg-color rounded-lg">
            <Image
                src={data.image_background}
                alt="background"
                width={300}
                height={300}
                className="object-cover w-full h-[230px] rounded-t-lg"
            />
            <div className="px-4 py-2 flex items-center justify-start gap-x-4">
                {data?.image && (
                    <Image
                        src={data?.image}
                        alt={data?.name}
                        width={70}
                        height={70}
                        className="mb-3 w-[70px] h-[70px] rounded-full"
                    />
                )}
                <div>
                    <div className="mb-2 flex items-baseline gap-x-3">
                        <p className="text-base font-semibold tracking-wider text-primary-white">
                            {data.name}:
                        </p>
                        <p className="text-primary-white text-sm">
                            {data.games_count} Games
                        </p>
                    </div>
                    <div className="divider" />
                    {data?.positions && (
                        <div className="mb-1 flex items-center justify-start gap-x-2">
                            {data?.positions.map((data, i, arr) => (
                                <p
                                    key={data.id}
                                    className="text-white text-sm first-letter:uppercase"
                                >
                                    {data.name}
                                    <span className="text-primary-yellow">
                                        {i !== arr.length - 1 ? " | " : " "}
                                    </span>
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreatorCard;
