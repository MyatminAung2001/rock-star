export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

// games
export const GET_GAMES_GENRES = `${baseURL}/games`;

// genres
export const GET_GENRES = `${baseURL}/genres`;

export const GET_GENRES_DETAILS = `${baseURL}/genres`;


// platforms
export const GET_PLATFORMS = `${baseURL}/platforms`;