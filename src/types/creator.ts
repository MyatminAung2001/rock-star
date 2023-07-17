export interface CreatorsData {
    id: number;
    name: string;
    slug: string;
    image: string;
    image_background: string;
    games_count: number;
    positions: {
        id: number;
        name: string;
        slug: string;
    }[];
    games: {
        id: number;
        slug: string;
        name: string;
        added: number;
    }[];
}

export interface Creators {
    count: number;
    next: string | null;
    previous: null | string;
    results: CreatorsData[];
}

export interface CreatorDetails {
    id: number;
    name: string;
    slug: string;
    image: string;
    image_background: string;
    description: string;
    games_count: number;
    reviews_count: number;
    rating: string;
    rating_top: number;
    updated: string;
    positions: {
        id: number;
        name: string;
        slug: string;
    }[];
    platforms: {
        total: number;
        results: {
            count: number;
            percent: number;
            platform: {
                id: number;
                name: string;
                slug: string;
            };
        }[];
        count: number;
    };
    ratings: {
        id: number;
        title: string;
        count: number;
        percent: number;
    }[];
    timeline: {
        year: number;
        count: number;
    }[];
}
