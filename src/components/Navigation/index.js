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
  POPULAR_IN_2022,
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

const WebNavigation = () => {
  return (
    <div className="ml-6 flex flex-col gap-y-3">
      <Link href={HOME}>
        <header className="text-sub-heading font-semibold tracking-wider text-primary-white cursor-pointer">
          Home
        </header>
      </Link>
      <hr />
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
            href={BEST_OF_THE_YEARS}
            activeIcon={<TrophyActiveIcon />}
            icon={<TrophyIcon />}
            title="Best of the year"
          />

          <NavItem
            href={POPULAR_IN_2022}
            activeIcon={<PopularActiveIcon />}
            icon={<PopularIcon />}
            title="Popular in 2022"
          />

          <NavItem
            href={All_TIME_TOP_250}
            activeIcon={<CrownActiveIcon />}
            icon={<CrownIcon />}
            title="All Time Top 250"
          />
        </div>
      </div>
      <hr />
      <Link href={GAMES}>
        <header className="text-sub-heading font-semibold tracking-wider text-primary-white cursor-pointer">
          All Games
        </header>
      </Link>
      <hr />
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
};

export default WebNavigation;
