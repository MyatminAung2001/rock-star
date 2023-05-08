"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";

import { getStores } from "@/services/service.stores";
import Card from "@/components/Common/Card";
import { StoreIcon } from "@/components/common/icons/StoreIcon";

const Stores = () => {
  const router = useRouter();

  const { isLoading, isError, data: stores } = useQuery("stores", getStores);

  if (isLoading) {
    return (
      <div className="w-[100%] h-screen flex items-center justify-center">
        <RotatingLines
          strokeColor="#B7B5B3"
          strokeWidth="2"
          animationDuration="0.75"
          width="50"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className="default-section-padding w-[100%]">
      <div className="flex items-center justify-center lg:justify-start gap-x-2 mb-5">
        <div className="lg:hidden">
          <StoreIcon />
        </div>
        <header className="heading">Stores</header>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {stores?.results?.map((data) => (
          <div key={data.id} onClick={() => router.push(`stores/${data.id}`)}>
            <Card data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stores;
