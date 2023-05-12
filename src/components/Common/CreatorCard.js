import Image from "next/image";

import { NUMBER_OF_ITEMS } from "@/constants/restrict";

const CreatorCard = ({ data }) => {
    return (
        <div
            key={data.id}
            className="w-[100%] h-[320px] flex items-center justify-center relative"
        >
            <span
                style={{
                    content: "",
                    backgroundImage: `
                    linear-gradient(rgba(32, 32, 32, 0.5), rgb(32, 32, 32) 70%),
                    url(${data.image_background})
                `,
                    backgroundSize: "cover",
                    backgroundPosition: "50%",
                    position: "absolute",
                    inset: "0px",
                    borderRadius: "0.5rem",
                }}
            />
            <div className="w-[100%] px-6 py-3 relative h-full flex flex-col justify-between bg-[#00000030] rounded-lg">
                <div className="flex flex-col items-center justify-center">
                    {data?.image && (
                        <Image
                            src={data?.image}
                            alt={data?.name}
                            width={80}
                            height={80}
                            className="rounded-full mb-3"
                        />
                    )}
                    <p className="mb-3 text-white text-base font-semibold tracking-wider text-center underline cursor-pointer">
                        {data.name}
                    </p>
                    {data?.positions && (
                        <div className="flex items-center justify-center gap-x-2">
                            {data?.positions.map((data, i, arr) => (
                                <p
                                    key={data.id}
                                    className="text-white text-xs first-letter:uppercase"
                                >
                                    {data.name}
                                    {i != arr.length - 1 ? ", " : " "}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
                <div>
                    <div className="flex items-center justify-between">
                        <p className="text-secondary-white text-sm font-semibold">
                            Known For:
                        </p>
                        <p className="text-secondary-gray text-sm">
                            {data.games_count}
                        </p>
                    </div>
                    <hr className="my-3" />
                    {data.games?.slice(0, NUMBER_OF_ITEMS)?.map((data) => (
                        <div
                            key={data.id}
                            className="flex items-center justify-between gap-y-1"
                        >
                            <p className="text-secondary-white font-light underline text-sm">
                                {data.name}
                            </p>
                            <p className="text-secondary-gray text-sm">
                                {data.added}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreatorCard;
