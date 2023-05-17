"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import SearchIcon from "./icons/SearchIcon";
import { getSearchGames } from "@/services/service.games";
import useDebounce from "@/hooks/useDebounce";

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const debounceSearchTerm = useDebounce(searchTerm, 500);

    const queryClient = useQueryClient();

    const {
        data: searchGames,
        isFetching,
        isError,
    } = useQuery(
        ["search-games", searchTerm],
        () => getSearchGames(debounceSearchTerm),
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

    console.log("search", searchGames?.results);

    return (
        <div className="mt-[4rem] px-4 lg:mt-3 relative">
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
            <div className="flex flex-col gapy-1">
                {searchGames?.length > 0 &&
                    searchGames?.results.map((data) => (
                        <div key={data.id}>
                            <Image
                                src={data.background_image}
                                alt={data.name}
                                width={60}
                                height={60}
                                className="rounded-md"
                            />
                            <p className="text-primary-white">{data.name}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default SearchBox;
