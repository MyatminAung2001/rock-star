import Image from "next/image";

interface Props {
    data: {
        id: number;
        name: string;
        domain: string;
        slug: string;
        games_count: number;
        image_background: string;
        games: {
            id: number;
            slug: string;
            name: string;
            added: number;
        }[];
    };
}

const Card = ({ data }: Props) => {
    return (
        <div key={data.id} className="bg-card-bg-color rounded-lg">
            <Image
                src={data.image_background}
                alt="background"
                width={300}
                height={300}
                className="object-cover w-full h-[230px] rounded-t-lg"
            />

            <div className="w-[100%] p-4 relative h-full flex flex-col justify-between rounded-lg">
                <p className="game-title">{data.name}</p>
                <div className="mt-2 flex items-center justify-between">
                    <p className="text-secondary-white text-sm font-semibold">
                        Total Games:
                    </p>
                    <p className="text-primary-white text-sm">
                        {data.games_count} Games
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card;
