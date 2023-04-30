import Image from "next/image";

import { NUMBER_OF_ITEMS } from "@/constants/restrict";

const CreatorCard = ({ data }) => {

    const positions = data?.positions.map(data => data.name);
    const positionsString = positions.join(","); 

    return (
        <div
            key={data.id}
            className="w-[100%] h-[250px] flex items-center justify-center relative"
        >
            <span style={{
                content: "",
                backgroundImage: `url(${data.image_background})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "absolute",
                top: "0px",
                right: "0px",
                left: "0px",
                bottom: "0px",
                opacity: 0.3,
                borderRadius: "0.5rem",
            }}/>
            <div className="w-[100%] px-6 py-3 relative h-full flex flex-col justify-between bg-[#00000030]">
                <div className="flex flex-col items-center justify-center">
                    {data?.image && (
                        <Image 
                            src={data?.image}
                            alt={data?.name}
                            width={60}
                            height={60}
                            style={{
                                borderRadius: "100%"
                            }}
                        />
                    )}
                    <p className="mb-1 text-white text-base font-semibold tracking-wider text-center underline cursor-pointer">
                        {data.name}
                    </p>
                    {data?.positions && (
                        <div className="flex items-center justify-center gap-x-2">
                            {data?.positions.map((data, i, arr) => (
                                <p key={data.id} className="text-white text-xs first-letter:uppercase">
                                    {data.name}{i != arr.length - 1 ? ", " : " "}
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
                        <div key={data.id} className="flex items-center justify-between gap-y-1">
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
}

export default CreatorCard;