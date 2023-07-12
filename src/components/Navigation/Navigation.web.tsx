"use client";

import Link from "next/link";

// components
import NavItem from "./NavItem";

// routes
import {
    HOME,
    BEST_OF_THE_YEARS,
    GENRES,
    PLATFORMS,
    STORES,
    TAGS,
    DEVELOPERS,
    PUBLISHERS,
    CREATORS,
    NEW_AND_TRENDING,
    GAMES,
    POPULAR_LAST_YEAR,
    All_TIME_TOP_250,
} from "@/constants/locationPathname";

// icons
import { GenreIcon, GenreActiveIcon } from "../Common/icons/GenreIcon";
import { ConsoleIcon, ConsoleActiveIcon } from "../Common/icons/ConsoleIcon";
import { StoreIcon, StoreActiveIcon } from "../Common/icons/StoreIcon";
import { TagIcon, TagActiveIcon } from "../Common/icons/TagIcon";
import { CodeIcon, CodeActiveIcon } from "../Common/icons/CodeIcon";
import { PublishIcon, PublishActiveIcon } from "../Common/icons/PublishIcon";
import { UserIcon, UserActiveIcon } from "../Common/icons/UserIcon";
import { TrophyIcon, TrophyActiveIcon } from "../Common/icons/TrophyIcon";
import { TrendingIcon, TrendingActiveIcon } from "../Common/icons/TrendingIcon";
import { PopularIcon, PopularActiveIcon } from "../Common/icons/PopularIcon";
import { CrownIcon, CrownActiveIcon } from "../Common/icons/CrownIcon";

const previousYear = new Date().getFullYear() - 1;

const TopNavigation = [
    {
        id: 1,
        link: NEW_AND_TRENDING,
        icon: <TrendingIcon />,
        activeIcon: <TrendingActiveIcon />,
        label: "New and trending",
    },
    {
        id: 2,
        link: BEST_OF_THE_YEARS,
        icon: <TrophyIcon />,
        activeIcon: <TrophyActiveIcon />,
        label: "Best of the year",
    },
    {
        id: 3,
        link: POPULAR_LAST_YEAR,
        icon: <PopularIcon />,
        activeIcon: <PopularActiveIcon />,
        label: `Popular in ${previousYear}`,
    },
    {
        id: 4,
        link: All_TIME_TOP_250,
        icon: <CrownIcon />,
        activeIcon: <CrownActiveIcon />,
        label: "All time top 250",
    },
];

const BrowseNavigation = [
    {
        id: 1,
        link: GENRES,
        icon: <GenreIcon />,
        activeIcon: <GenreActiveIcon />,
        label: "Genres",
    },
    {
        id: 2,
        link: PLATFORMS,
        icon: <ConsoleIcon />,
        activeIcon: <ConsoleActiveIcon />,
        label: "Platforms",
    },
    {
        id: 3,
        link: STORES,
        icon: <StoreIcon />,
        activeIcon: <StoreActiveIcon />,
        label: "Stores",
    },
    {
        id: 4,
        link: TAGS,
        icon: <TagIcon />,
        activeIcon: <TagActiveIcon />,
        label: "Tags",
    },
    {
        id: 5,
        link: DEVELOPERS,
        icon: <CodeIcon />,
        activeIcon: <CodeActiveIcon />,
        label: "Developers",
    },
    {
        id: 6,
        link: PUBLISHERS,
        icon: <PublishIcon />,
        activeIcon: <PublishActiveIcon />,
        label: "Publishers",
    },
    {
        id: 7,
        link: CREATORS,
        icon: <UserIcon />,
        activeIcon: <UserActiveIcon />,
        label: "Creators",
    },
];

const NavigationWeb = () => {
    return (
        <div className="ml-6 flex flex-col gap-y-3">
            <Link href={HOME}>
                <header className="web-nav-link-heading">BitBazaar</header>
            </Link>
            <hr />
            <div>
                <header className="web-nav-heading">Top</header>
                <div className="mt-3 flex flex-col gap-y-1">
                    {TopNavigation.map((data) => (
                        <NavItem
                            key={data.id}
                            href={data.link}
                            activeIcon={data.activeIcon}
                            icon={data.icon}
                            title={data.label}
                        />
                    ))}
                </div>
            </div>
            <hr />
            <Link href={GAMES}>
                <header className="web-nav-link-heading">All Games</header>
            </Link>
            <hr />
            <div>
                <header className="web-nav-heading">Browse</header>
                <div className="mt-3 flex flex-col gap-y-1">
                    {BrowseNavigation.map((data) => (
                        <NavItem
                            key={data.id}
                            href={data.link}
                            activeIcon={data.activeIcon}
                            icon={data.icon}
                            title={data.label}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NavigationWeb;
