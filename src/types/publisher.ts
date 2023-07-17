export interface Publisher {
    count: number;
    next: string | null;
    previous: null | string;
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

export interface PublisherDetail {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    description: string;
}
