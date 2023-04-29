"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

import { getStores } from "@/services/service.stores";
import Card from "@/components/Card";
import StoreIcon from "@/assets/icons/StoreIcon";

const Stores = () => {

    const router = useRouter();

    const { isLoading, isError, data: storesData } = useQuery("stores", getStores);

    return (
        <div className="default-section-padding w-[100%]">
            <div className="flex items-center justify-center gap-x-2 mb-5">
                <StoreIcon />
                <header className="heading">
                    Stores
                </header>
            </div>
            <div className="grid grid-cols-1 gap-y-5">
                {storesData?.results?.map((data) => (
                    <div key={data.id} onClick={() => router.push(`platforms/${data.id}`)}>
                        <Card data={data} />
                    </div>
                ))}
            </div>
        </div>
  );
};

export default Stores;