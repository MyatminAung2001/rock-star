"use client"

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

import { GENRES, PLATFORMS, STORES, TAGS, DEVELOPERS, PUBLISHERS, CREATORS } from '@/constants/locationPathname';
import { GenreIcon, GenreActiveIcon } from "@/assets/icons/GenreIcon";

const WebNavigation = () => {

    const router = useRouter();

    const pathname = usePathname();

    return (
        <div className="px-4 py-16">
            <header className="text-sub-heading font-semibold tracking-wider text-primary-white">
                Browse
            </header>
            <div className="mt-3 flex flex-col gap-y-3">
                <Link href={GENRES} className="flex items-center gap-x-2 py-1 rounded-md">
                    {pathname.startsWith(GENRES) ? (
                        <div className="bg-[#FFFFFF] rounded p-2">
                            <GenreActiveIcon />
                        </div>
                    ) : (
                        <div className="bg-[#202020] rounded p-2">
                            <GenreIcon />
                        </div>
                    )}
                    <p className="text-primary-white">
                        Genres
                    </p>
                </Link>
                <p onClick={() => {
                    router.push(PLATFORMS);
                
                }} className="cursor-pointer">
                    Platforms
                </p>
                <p onClick={() => {
                    router.push(STORES);
                    
                }} className="cursor-pointer">
                    Stores
                </p>
                <p onClick={() => {
                    router.push(TAGS);
                    
                }} className="cursor-pointer">
                    Tags
                </p>
                <p onClick={() => {
                    router.push(DEVELOPERS);
                    
                }} className="cursor-pointer">
                    Developers
                </p>
                <p onClick={() => {
                    router.push(PUBLISHERS);
                
                }} className="cursor-pointer">
                    Publishers
                </p>
                <p onClick={() => {
                    router.push(CREATORS);
                    
                }} className="cursor-pointer">
                    Creators
                </p>
            </div>
        </div>
    );
}

export default WebNavigation;