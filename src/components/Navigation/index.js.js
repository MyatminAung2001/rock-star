"use client"

import { useRouter, usePathname } from "next/navigation";

import NavItem from "./NavItem";
import { GENRES, PLATFORMS, STORES, TAGS, DEVELOPERS, PUBLISHERS, CREATORS } from '@/constants/locationPathname';
import { GenreIcon, GenreActiveIcon } from "@/assets/icons/GenreIcon";
import { ConsoleActiveIcon, ConsoleIcon } from "@/assets/icons/ConsoleIcon";
import { StoreActiveIcon, StoreIcon } from "@/assets/icons/StoreIcon";
import { TagActiveIcon, TagIcon } from "@/assets/icons/TagIcon";
import { CodeActiveIcon, CodeIcon } from "@/assets/icons/CodeIcon";
import { PublishActiveIcon, PublishIcon } from "@/assets/icons/PublishIcon";
import { UserActiveIcon, UserIcon } from "@/assets/icons/UserIcon";

const WebNavigation = () => {

    const router = useRouter();

    const pathname = usePathname();

    return (
        <div className="px-4 py-16">
            <header className="text-sub-heading font-semibold tracking-wider text-primary-white">
                Browse
            </header>
            <div className="mt-3 flex flex-col gap-y-2">
                <NavItem 
                    href={GENRES}
                    activeIcon={<GenreActiveIcon />}
                    icon={<GenreIcon />}
                    title="Genres"
                />
                <NavItem 
                    href={PLATFORMS}
                    activeIcon={<ConsoleActiveIcon />}
                    icon={<ConsoleIcon />}
                    title="Platforms"
                />

                <NavItem 
                    href={STORES}
                    activeIcon={<StoreActiveIcon />}
                    icon={<StoreIcon />}
                    title="Stores"
                />

                <NavItem 
                    href={TAGS}
                    activeIcon={<TagActiveIcon />}
                    icon={<TagIcon />}
                    title="Tags"
                />

                <NavItem 
                    href={DEVELOPERS}
                    activeIcon={<CodeActiveIcon />}
                    icon={<CodeIcon />}
                    title="Developers"
                />

                <NavItem 
                    href={PUBLISHERS}
                    activeIcon={<PublishActiveIcon />}
                    icon={<PublishIcon />}
                    title="Publishers"
                />

                <NavItem 
                    href={CREATORS}
                    activeIcon={<UserActiveIcon />}
                    icon={<UserIcon />}
                    title="Creators"
                />
            </div>
        </div>
    );
}

export default WebNavigation;