import axiosInstance from "@/utils/axiosInstance"
import { apiKEY } from "@/constants/api";
import { GET_GENRES, GET_GAMES } from "@/constants/api";

export const getGenres = async () => {
    return await axiosInstance.get(
        `${GET_GENRES}?key=${apiKEY}`
    ).then(res => res.data);
};

export const getGenresDetails = async (data) => {
    return await axiosInstance.get(
        `${GET_GENRES}/${data}?key=${apiKEY}`
    ).then(res => res.data);
};

export const getGenresGames = async (slug, pageParam) => {
    return await axiosInstance.get(
        `${GET_GAMES}?key=${apiKEY}&genres=${slug}&page=${pageParam}&page_size=12`
    ).then(res => res.data);
};