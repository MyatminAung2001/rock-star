const baseURL = process.env.BASE_URL;
const apiKEY = process.env.API_KEY;

// genres
export const GET_GENRES = `${baseURL}/genres?key=${apiKEY}`;