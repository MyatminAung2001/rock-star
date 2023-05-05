"use client"

import Link from "next/link";

// components
import NavItem from "./NavItem";

// routes
import { 
    BEST_OF_THE_YEARS,
    GENRES, 
    PLATFORMS, 
    STORES, 
    TAGS, 
    DEVELOPERS, 
    PUBLISHERS, 
    CREATORS, 
    NEW_AND_TRENDING,
    All_GAMES,
    POPULAR_IN_2022,
    All_TIME_TOP_250
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
import { TrendingActiveIcon, TrendingIcon } from "@/assets/icons/TrendingIcon";
import { PopularActiveIcon, PopularIcon } from "@/assets/icons/PopularIcon";
import { CrownActiveIcon, CrownIcon } from "@/assets/icons/CrownIcon";

const WebNavigation = () => {

    return (
        <div className="ml-6 flex flex-col gap-y-3">
            <div>
                <header className="text-sub-heading font-semibold tracking-wider text-primary-white">
                    Top
                </header>
                <div className="mt-3 flex flex-col gap-y-1">
                    <NavItem 
                        href={NEW_AND_TRENDING}
                        activeIcon={<TrendingActiveIcon />}
                        icon={<TrendingIcon />}
                        title="New and trending"
                    />

                    <NavItem 
                        href={POPULAR_IN_2022}
                        activeIcon={<PopularActiveIcon />}
                        icon={<PopularIcon />}
                        title="Popular in 2022"
                    />

                    <NavItem 
                        href={BEST_OF_THE_YEARS}
                        activeIcon={<TrophyActiveIcon />}
                        icon={<TrophyIcon />}
                        title="Best of the year"
                    />

                    <NavItem 
                        href={All_TIME_TOP_250}
                        activeIcon={<CrownActiveIcon />}
                        icon={<CrownIcon />}
                        title="All Time Top 250"
                    />
                </div>
            </div>


            <Link href={All_GAMES}>
                <header className="text-sub-heading font-semibold tracking-wider text-primary-white cursor-pointer">
                    All Games
                </header>
            </Link>

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