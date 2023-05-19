import axiosInstance from "@/utils/axiosInstance";
import { apiKEY } from "@/constants/api";
import { GET_PLATFORMS, GET_GAMES } from "@/constants/api";

export const getPlatforms = async () => {
    return await axiosInstance
        .get(`${GET_PLATFORMS}?key=${apiKEY}`)
        .then((res) => res.data);
};

export const getPlatformsDetails = async (slug) => {
    return await axiosInstance
        .get(`${GET_PLATFORMS}/${slug}?key=${apiKEY}`)
        .then((res) => res.data);
};

export const getPlatformsGames = async ({ id, pageParam }) => {
    return await axiosInstance
        .get(
            `${GET_GAMES}?key=${apiKEY}&platforms=${id}&page=${pageParam}&page_size=12`
        )
        .then((res) => res.data);
};
