import axiosInstance from "@/utils/axiosInstance"
import { apiKEY } from "@/constants/api";
import { GET_GENRES, GET_GENRES_DETAILS, GET_GAMES_GENRES } from "@/constants/api";

export const getGenres = async () => {
    return await axiosInstance.get(`${GET_GENRES}?key=${apiKEY}`).then(res => res.data);
};

export const getGenresDetails = async (data) => {
    return await axiosInstance.get(`${GET_GENRES_DETAILS}/${data}?key=${apiKEY}`).then(res => res.data)
};

export const getGenresGames = async (slug, pageParam) => {
    return await axiosInstance.get(`${GET_GAMES_GENRES}?key=${apiKEY}&genres=${slug}&page=${pageParam}`).then(res => res.data);
};