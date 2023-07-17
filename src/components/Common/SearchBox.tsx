"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

import SearchIcon from "./icons/SearchIcon";
import { getSearchGames } from "@/services/service.games";
import useDebounce from "@/hooks/useDebounce";

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const debounceSearchTerm = useDebounce(searchTerm, 500);

    const queryClient = useQueryClient();

    const {
        data: searchGames,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ["search-games", debounceSearchTerm],
        queryFn: () => getSearchGames(debounceSearchTerm),
        enabled: !!debounceSearchTerm,
    });

    useEffect(() => {
        return () => {
            // Clear the query cache when the component is unmounted or the search text changes
            queryClient.removeQueries(["search-games"]);
        };
    }, [searchTerm, queryClient]);

    if (isError) return null;

    return (
        <div className="mt-[4rem] mx-4 lg:mt-3 relative">
            <div className="flex items-center justify-between w-[100%] lg:w-[500px] px-4 py-2 bg-[#212529] rounded-full">
                <div className="cursor-pointer">
                    <SearchIcon />
                </div>
                <input
                    type="search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for"
                    className="w-[100%] ml-3 bg-transparent placeholder:text-sm focus:outline-none text-white"
                />
            </div>
            {/* {isLoading && (
                <div className="absolute z-40 w-[100%] mt-3 ml-3 right-0 flex items-center justify-center h-[100px] bg-[#212529] px-4 py-3 rounded-md">
                    <Loading />
                </div>
            )} */}
            {searchGames?.results.length > 0 && (
                <div className="absolute z-40 w-[100%] right-0 bg-[#212529] px-4 py-3 rounded-md grid grid-cols-1 lg:grid-cols-3 gap-y-2 mt-3">
                    {searchGames?.results.map((data: any) => (
                        <Link
                            href={`/games/${data.slug}`}
                            key={data.id}
                            className="flex items-start gap-x-2 relative"
                        >
                            <Image
                                src={data.background_image}
                                alt={data.name}
                                width={90}
                                height={90}
                                className="w-[90px] h-[90px] object-cover rounded-lg"
                            />

                            <div className=" absolute left-[6rem]">
                                <p className="text-white text-sm">
                                    {new Date(data.released).toLocaleDateString(
                                        "en-us",
                                        {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        }
                                    )}
                                </p>
                                <p className="text-primary-white">
                                    {data.name}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBox;
