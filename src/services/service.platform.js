import axiosInstance from "@/utils/axiosInstance"
import { apiKEY } from "@/constants/api";
import { GET_PLATFORMS, GET_PLATFORMS_DETAILS, GET_PLATFORMS_GAMES } from "@/constants/api";

export const getPlatforms = async () => {
    return await axiosInstance.get(`${GET_PLATFORMS}?key=${apiKEY}`).then(res => res.data);
};

export const getPlatformsDetails = async (slug) => {
    return await axiosInstance.get(`${GET_PLATFORMS_DETAILS}/${slug}?key=${apiKEY}`).then(res => res.data);
}

export const getPlatformsGames = async (id, pageParam) => {
    return await axiosInstance.get(`${GET_PLATFORMS_GAMES}?key=${apiKEY}&platforms=${id}&page=${pageParam}`).then(res => res.data);
};