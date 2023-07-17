export interface GameData {
    id: number;
    slug: string;
    name: string;
    released: string;
    tba: boolean;
    background_image: string;
    rating: number;
    rating_top: number;
    ratings: {
        id: number;
        title: string;
        count: number;
        percent: number;
    }[];
    ratings_count: number;
    reviews_text_count: number;
    added: number;
    added_by_status: {
        yet: number;
        owned: number;
        beaten: number;
        toplay: number;
        dropped: number;
        playing: number;
    };
    metacritic: number | null;
    playtime: number;
    suggestions_count: number;
    updated: string;
    user_game: null;
    reviews_count: number;
    saturated_color: string;
    dominant_color: string;
    platforms: {
        platform: {
            id: number;
            name: string;
            slug: string;
            image?: null;
            year_end?: null;
            year_start?: number;
            games_count?: number;
            image_background?: string;
        };
        released_at: string;
        requirements_en: null;
        requirements_ru: null;
    }[];
    parent_platforms: {
        platform: {
            id: number;
            name: string;
            slug: string;
        };
    }[];
    genres: {
        id: number;
        name: string;
        slug: string;
        games_count: number;
        image_background: string;
    }[];
    stores: {
        id: number;
        store: {
            id: number;
            name: string;
            slug: string;
            domain: string;
            games_count: number;
            image_background: string;
        };
    }[];
    clip: null;
    tags: {
        id: number;
        name: string;
        slug: string;
        language: string;
        games_count: number;
        image_background: string;
    }[];
    esrb_rating: {
        id: number;
        name: string;
        slug: string;
    };
    short_screenshots: {
        id: number;
        image: string;
    }[];
}

export interface Games {
    count: number;
    next: string | null;
    previous: null | string;
    results: GameData[];
}

export interface RelatedGameData {
    slug: string;
    name: string;
    playtime: number;
    platforms: {
        platform: {
            id: number;
            name: string;
            slug: string;
        };
    }[];
    stores: {
        store: {
            id: number;
            name: string;
            slug: string;
        };
    }[];
    released: string;
    tba: boolean;
    background_image: string;
    rating: number;
    rating_top: number;
    ratings: {
        id: number;
        title: string;
        count: number;
        percent: number;
    }[];
    ratings_count: number;
    reviews_text_count: number;
    added: number;
    added_by_status: {
        yet: number;
        owned: number;
        beaten: number;
        toplay: number;
        dropped: number;
        playing: number;
    };
    metacritic: null | number;
    suggestions_count: number;
    updated: string;
    id: number;
    score: null;
    clip: null;
    tags: {
        id: number;
        name: string;
        slug: string;
        language: string;
        games_count: number;
        image_background: string;
    }[];
    esrb_rating: {
        id: number;
        name: string;
        slug: string;
        name_en: string;
        name_ru: string;
    };
    user_game: null;
    reviews_count: number;
    saturated_color: string;
    dominant_color: string;
    short_screenshots: {
        id: number;
        image: string;
    }[];
    parent_platforms: {
        platform: {
            id: number;
            name: string;
            slug: string;
        };
    }[];
    genres: {
        id: number;
        name: string;
        slug: string;
    }[];
}

export interface RelatedGames {
    count: number;
    next: null | string;
    previous: string | null;
    results: RelatedGameData[];
    user_platforms: false;
}
