"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import SearchIcon from "./icons/SearchIcon";
import { getSearchGames } from "@/services/service.games";
import useDebounce from "@/hooks/useDebounce";

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const debounceSearchTerm = useDebounce(searchTerm, 500);

    const queryClient = useQueryClient();

    const {
        data: searchGames,
        isLoading,
        isError,
    } = useQuery(
        ["search-games", searchTerm],
        () => getSearchGames(searchTerm),
        {
            enabled: !!searchTerm,
        }
    );

    useEffect(() => {
        return () => {
            // Clear the query cache when the component is unmounted or the search text changes
            queryClient.removeQueries("search-games");
        };
    }, [searchTerm, queryClient]);

    if (isError) return null;

    console.log("search", searchGames?.results);

    return (
        <div className="mt-[4rem] px-4 lg:mt-3 relative">
            <div className="flex items-center justify-between w-[100%] lg:w-[500px] px-4 py-2 bg-[#212529] rounded-full">
                <div className="cursor-pointer">
                    <SearchIcon />
                </div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for"
                    className="w-[100%] ml-3 bg-transparent placeholder:text-sm focus:outline-none text-white"
                />
            </div>
            {isLoading ? (
                <p className="text-white text-center">Loading...</p>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-y-2 mt-3">
                    {searchGames?.results.map((data) => (
                        <div
                            key={data.id}
                            className="flex items-start gap-x-2 relative"
                        >
                            <LazyLoadImage
                                src={data.background_image}
                                alt={data.name}
                                effect="blur"
                                threshold={50}
                                className="object-cover w-[90px] h-[90px] rounded-xl"
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
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBox;
