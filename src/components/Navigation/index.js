"use client"

import { useRouter } from "next/navigation";

// components
import NavItem from "./NavItem";

// routes
import { 
    GAMES, 
    BEST_OF_THE_YEARS,
    GENRES, 
    PLATFORMS, 
    STORES, 
    TAGS, 
    DEVELOPERS, 
    PUBLISHERS, 
    CREATORS 
} from '@/constants/locationPathname';

// icons
import { GenreIcon, GenreActiveIcon } from "@/assets/icons/GenreIcon";
import { ConsoleActiveIcon, ConsoleIcon } from "@/assets/icons/ConsoleIcon";
import { StoreActiveIcon, StoreIcon } from "@/assets/icons/StoreIcon";
import { TagActiveIcon, TagIcon } from "@/assets/icons/TagIcon";
import { CodeActiveIcon, CodeIcon } from "@/assets/icons/CodeIcon";
import { PublishActiveIcon, PublishIcon } from "@/assets/icons/PublishIcon";
import { UserActiveIcon, UserIcon } from "@/assets/icons/UserIcon";
import { TrophyActiveIcon, TrophyIcon } from "@/assets/icons/TrophyIcon";

const WebNavigation = () => {

    const router = useRouter();

    return (
        <div className="ml-6 flex flex-col gap-y-3">
            <div>
                <header className="text-sub-heading font-semibold tracking-wider text-primary-white">
                    Top
                </header>
                <div className="mt-3 flex flex-col gap-y-1">
                    <NavItem 
                        href={BEST_OF_THE_YEARS}
                        activeIcon={<TrophyActiveIcon />}
                        icon={<TrophyIcon />}
                        title="Best of the year"
                    />
                </div>
            </div>


            <header 
                onClick={() => router.push(GAMES)} 
                className="text-sub-heading font-semibold tracking-wider text-primary-white cursor-pointer"
            >
                All Games
            </header>

            <div>
                <header className="text-sub-heading font-semibold tracking-wider text-primary-white">
                    Browse
                </header>
                <div className="mt-3 flex flex-col gap-y-1">
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
        </div>
    );
}

export default WebNavigation;