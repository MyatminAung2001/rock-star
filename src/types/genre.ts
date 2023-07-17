export interface Genre {
    count: number;
    next: null;
    previous: null;
    results: {
        id: number;
        name: string;
        slug: string;
        games_count: number;
        image_background: string;
        games: {
            id: number;
            slug: string;
            name: string;
            added: number;
        }[];
    }[];
}

export interface GenreDetails {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    description: string;
}
