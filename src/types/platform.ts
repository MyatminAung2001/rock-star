export interface Platform {
    count: number;
    next: string;
    previous: null;
    results: {
        id: number;
        name: string;
        slug: string;
        games_count: number;
        image_background: string;
        image: null;
        year_start: null;
        year_end: null;
        games: {
            id: number;
            slug: string;
            name: string;
            added: number;
        }[];
    }[];
}

export interface PlatformDetails {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    description: string;
    image: null;
    year_start: null;
    year_end: null;
}
