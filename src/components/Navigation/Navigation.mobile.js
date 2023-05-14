"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Squash as Hamburger } from "hamburger-react";

import {
    GENRES,
    PLATFORMS,
    STORES,
    TAGS,
    DEVELOPERS,
    PUBLISHERS,
    CREATORS,
    NEW_AND_TRENDING,
    HOME,
    BEST_OF_THE_YEARS,
    POPULAR_IN_2022,
    All_TIME_TOP_250,
    GAMES,
} from "@/constants/locationPathname";

const TopNavigation = [
    { id: 1, link: NEW_AND_TRENDING, label: "New and trending" },
    { id: 2, link: BEST_OF_THE_YEARS, label: "Best of the year" },
    { id: 3, link: POPULAR_IN_2022, label: "Popular in 2022" },
    { id: 4, link: All_TIME_TOP_250, label: "All time top 250" },
];

const BrowseNavigation = [
    { id: 1, link: GENRES, label: "Genres" },
    { id: 2, link: PLATFORMS, label: "Platforms" },
    { id: 3, link: STORES, label: "Stores" },
    { id: 4, link: TAGS, label: "Tags" },
    { id: 5, link: DEVELOPERS, label: "Developers" },
    { id: 6, link: PUBLISHERS, label: "Publishers" },
    { id: 7, link: CREATORS, label: "Creators" },
];

const NavigationMobile = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScroll, setIsScroll] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScroll(true);
            } else {
                setIsScroll(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`default-section-padding lg:hidden fixed z-50 top-0 py-3 w-screen ${
                isScroll ? "bg-[#151515]" : "bg-transparent"
            }`}
        >
            <div className="flex items-center justify-between">
                <Link className="title cursor-pointer" href={HOME}>
                    RockStar
                </Link>
                <div className="sticky z-[150] top-0 right-0 lg:hidden">
                    <Hamburger
                        toggled={isMenuOpen}
                        toggle={setIsMenuOpen}
                        size={28}
                        color={isMenuOpen ? "#141301" : "#E5E7E6"}
                        label="menu"
                    />
                </div>
            </div>
            <div className="lg:hidden">
                {isMenuOpen && (
                    <div className="bg-primary-bg-white min-h-screen w-[70%] p-8 fixed right-0 top-0">
                        <div>
                            <header className="text-sub-heading font-semibold tracking-wider">
                                Top
                            </header>
                            <div className="mt-3 flex flex-col gap-y-3">
                                {TopNavigation.map((data) => (
                                    <Link
                                        key={data.id}
                                        href={data.link}
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                        }}
                                        className="cursor-pointer"
                                    >
                                        {data.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <hr className="my-3" />
                        <Link href={GAMES}>
                            <header className="text-sub-heading font-semibold tracking-wider">
                                All Games
                            </header>
                        </Link>
                        <hr className="my-3" />
                        <div>
                            <header className="text-sub-heading font-semibold tracking-wider">
                                Browse
                            </header>
                            <div className="mt-3 flex flex-col gap-y-3">
                                {BrowseNavigation.map((data) => (
                                    <Link
                                        key={data.id}
                                        href={data.link}
                                        onClick={() => {
                                            setIsMenuOpen(false);
                                        }}
                                        className="cursor-pointer"
                                    >
                                        {data.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavigationMobile;
