"use client"

import { useRouter } from "next/navigation";

import { GENRES, PLATFORMS, STORES, TAGS, DEVELOPERS, PUBLISHERS, CREATORS } from '@/constants/locationPathname';

const WebNavigation = () => {

    const router = useRouter();

    return (
        <div className="px-8">
            <header className="text-sub-heading font-semibold tracking-wider">
                Browse
            </header>
            <div className="mt-3 flex flex-col gap-y-3">
                <p onClick={() => {
                    router.push(GENRES);
                    
                }} className="cursor-pointer">
                    Genres
                </p>
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