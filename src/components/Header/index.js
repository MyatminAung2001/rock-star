"use client"

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Squash as Hamburger } from 'hamburger-react';

import { GENRES, PLATFORMS, STORES, TAGS, DEVELOPERS, PUBLISHERS, CREATORS } from '@/constants/locationPathname';

const Header = () => {

    const router = useRouter();

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

        return () => window.removeEventListener("scroll", handleScroll)
    }, []);

    return (
        <nav className={`default-section-padding fixed z-50 top-0 py-3 w-screen ${isScroll ? "bg-[#151515]" : "bg-transparent"}`}>
            <div className="flex items-center justify-between">
                <p className="title cursor-pointer" onClick={() => router.push("/")}>
                    RockStar
                </p>
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
                    <div className="bg-primary-bg-white min-h-screen w-[70%] fixed right-0 top-0">
                        <div className="pt-16 px-8">
                            <header className="text-sub-heading font-semibold tracking-wider">
                                Browse
                            </header>
                            <div className="mt-3 flex flex-col gap-y-3">
                                <p onClick={() => {
                                    router.push(GENRES);
                                    setIsMenuOpen(false)
                                }} className="cursor-pointer">
                                    Genres
                                </p>
                                <p onClick={() => {
                                    router.push(PLATFORMS);
                                    setIsMenuOpen(false)
                                }} className="cursor-pointer">
                                    Platforms
                                </p>
                                <p onClick={() => {
                                    router.push(STORES);
                                    setIsMenuOpen(false)
                                }} className="cursor-pointer">
                                    Stores
                                </p>
                                <p onClick={() => {
                                    router.push(TAGS);
                                    setIsMenuOpen(false)
                                }} className="cursor-pointer">
                                    Tags
                                </p>
                                <p onClick={() => {
                                    router.push(DEVELOPERS);
                                    setIsMenuOpen(false)
                                }} className="cursor-pointer">
                                    Developers
                                </p>
                                <p onClick={() => {
                                    router.push(PUBLISHERS);
                                    setIsMenuOpen(false)
                                }} className="cursor-pointer">
                                    Publishers
                                </p>
                                <p onClick={() => {
                                    router.push(CREATORS);
                                    setIsMenuOpen(false)
                                }} className="cursor-pointer">
                                    Creators
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

export default Header;