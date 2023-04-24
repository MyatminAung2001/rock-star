const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
const apiKEY = process.env.NEXT_PUBLIC_API_KEY;

// genres
export const GET_GENRES = `${baseURL}/genres?key=${apiKEY}`;