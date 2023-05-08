"use client";

import { useRouter } from "next/navigation";
import { useQuery } from "react-query";
import { RotatingLines } from "react-loader-spinner";

import { getGenres } from "@/services/service.genres";
import Card from "@/components/Common/Card";
import { GenreIcon } from "@/components/Common/icons/GenreIcon";

const Genres = () => {
  const router = useRouter();

  const { isLoading, isError, data: genres } = useQuery("genres", getGenres);

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
    <div className="px-4 pt-20 pb-5 w-[100%]">
      <div className="flex items-center justify-center lg:justify-start gap-x-2 mb-5">
        <div className="lg:hidden">
          <GenreIcon />
        </div>
        <header className="heading">Genres</header>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
        {genres?.results?.map((data) => (
          <div key={data.id} onClick={() => router.push(`genres/${data.slug}`)}>
            <Card data={data} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Genres;
