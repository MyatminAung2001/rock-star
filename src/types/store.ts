export interface Store {
    count: number;
    next: null | string;
    previous: null | string;
    results: {
        id: number;
        name: string;
        domain: string;
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

export interface StoreDetails {
    id: number;
    name: string;
    domain: string;
    slug: string;
    games_count: number;
    image_background: string;
    description: string;
}
