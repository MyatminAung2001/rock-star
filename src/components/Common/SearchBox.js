"use client";

import React, { useState } from "react";
import { useQuery } from "react-query";

import SearchIcon from "./icons/SearchIcon";
import { getSearchGames } from "@/services/service.games";
import useDebounce from "@/hooks/useDebounce";

const SearchBox = () => {
    const [searchInput, setSearchInput] = useState("");

    const debounceSearch = useDebounce(searchInput, 500);

    const {
        data: searchGames,
        isLoading,
        isError,
    } = useQuery(["search-games", searchInput], getSearchGames(debounceSearch));

    console.log("search", searchGames);

    return (
        <div className="mt-[4rem] px-4 lg:mt-3 relative">
            <div className="flex items-center justify-between w-[100%] lg:w-[500px] px-4 py-2 bg-[#212529] rounded-full">
                <div className="cursor-pointer">
                    <SearchIcon />
                </div>
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    placeholder="Search for"
                    className="w-[100%] ml-3 bg-transparent placeholder:text-sm focus:outline-none text-white"
                />
            </div>
            {searchInput && <div className="absolute"></div>}
        </div>
    );
};

export default SearchBox;
