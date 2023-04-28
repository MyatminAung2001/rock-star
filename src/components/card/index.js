import { NUMBER_OF_ITEMS } from "@/constants/numberOfItems";

const Card = ({ data }) => {
    return (
        <div
            key={data.id}
            className="w-[100%] h-[230px] flex items-center justify-center relative"
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
                opacity: 0.4,
                borderRadius: "0.5rem",
            }}/>
            <div className="w-[100%] p-6 relative h-full flex flex-col justify-between bg-[#00000030]">
                <p className="text-white text-lg font-semibold tracking-wider text-center underline cursor-pointer">
                    {data.name}
                </p>
                <div>
                    <div className="flex items-center justify-between">
                        <p className="text-secondary-white text-sm font-semibold">
                            Total Games:
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

export default Card;