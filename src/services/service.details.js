import axiosInstance from "@/utils/axiosInstance"
import { apiKEY } from "@/constants/api";
import { GET_GAMES } from "@/constants/api";

export const getGameDetails = async (slug) => {
    return await axiosInstance.get(
        `${GET_GAMES}/${slug}?key=${apiKEY}`
    ).then(res => res.data)
};

export const getGameSeries = async (slug) => {
    return await axiosInstance.get(
        `${GET_GAMES}/${slug}/game-series?key=${apiKEY}`
    ).then(res => res.data)
};