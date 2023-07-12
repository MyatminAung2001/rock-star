import Link from "next/link";

import storesData from "@/data/storesData";

interface Props {
    stores: {
        count: 1;
        next: null | string;
        previous: null | string;
        results: {
            id: number;
            game_id: number;
            store_id: number;
            url: string;
        }[];
    };
}

const Stores = ({ stores }: Props) => {
    return (
        <>
            {stores?.count > 0 && (
                <div className="mb-3">
                    <p className="detail-heading mb-3">Where to buy</p>
                    <div className="flex items-center gap-3 flex-wrap">
                        {stores?.results.map((store, index) => {
                            const storeItem = storesData.find(
                                (item) => item.id === store.store_id
                            );

                            return (
                                <Link
                                    key={index}
                                    href={store.url}
                                    target="__blank"
                                    className="flex items-center gap-x-2 px-4 py-2 bg-secondary-bg-black rounded-md"
                                >
                                    <p className="text-primary-white text-sm font-light">
                                        {storeItem?.name}
                                    </p>
                                    <span>{storeItem?.icon}</span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default Stores;
