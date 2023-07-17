export interface Developers {
    count: number;
    next: string;
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

export interface DeveloperDetails {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    description: string;
}
