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
                                <Link
                                    href={NEW_AND_TRENDING}
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                    }}
                                    className="cursor-pointer"
                                >
                                    New and trending
                                </Link>
                                <Link
                                    href={BEST_OF_THE_YEARS}
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                    }}
                                    className="cursor-pointer"
                                >
                                    Best of the year
                                </Link>
                                <Link
                                    href={POPULAR_IN_2022}
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                    }}
                                    className="cursor-pointer"
                                >
                                    Popular in 2022
                                </Link>
                                <Link
                                    href={All_TIME_TOP_250}
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                    }}
                                    className="cursor-pointer"
                                >
                                    All time top 250
                                </Link>
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
                                <Link
                                    href={GENRES}
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                    }}
                                    className="cursor-pointer"
                                >
                                    Genres
                                </Link>
                                <p
                                    onClick={() => {
                                        router.push(PLATFORMS);
                                        setIsMenuOpen(false);
                                    }}
                                    className="cursor-pointer"
                                >
                                    Platforms
                                </p>
                                <p
                                    onClick={() => {
                                        router.push(STORES);
                                        setIsMenuOpen(false);
                                    }}
                                    className="cursor-pointer"
                                >
                                    Stores
                                </p>
                                <p
                                    onClick={() => {
                                        router.push(TAGS);
                                        setIsMenuOpen(false);
                                    }}
                                    className="cursor-pointer"
                                >
                                    Tags
                                </p>
                                <p
                                    onClick={() => {
                                        router.push(DEVELOPERS);
                                        setIsMenuOpen(false);
                                    }}
                                    className="cursor-pointer"
                                >
                                    Developers
                                </p>
                                <p
                                    onClick={() => {
                                        router.push(PUBLISHERS);
                                        setIsMenuOpen(false);
                                    }}
                                    className="cursor-pointer"
                                >
                                    Publishers
                                </p>
                                <p
                                    onClick={() => {
                                        router.push(CREATORS);
                                        setIsMenuOpen(false);
                                    }}
                                    className="cursor-pointer"
                                >
                                    Creators
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default NavigationMobile;
