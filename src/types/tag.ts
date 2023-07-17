export interface Tag {
    count: number;
    next: null | string;
    previous: null | string;
    results: {
        id: number;
        name: string;
        slug: string;
        games_count: number;
        image_background: string;
        language: string;
        games: {
            id: number;
            slug: string;
            name: string;
            added: number;
        }[];
    }[];
}

export interface TagDetails {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    description: string;
}
