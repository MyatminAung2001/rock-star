export const fetchGamesDetail = async (slug: string) => {
    return await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/games/${slug}?key=${process.env.NEXT_PUBLIC_API_KEY}`
    ).then((res) => res.json());
};
