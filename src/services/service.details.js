import axiosInstance from "@/utils/axiosInstance";
import { apiKEY } from "@/constants/api";
import { GET_GAMES } from "@/constants/api";

export const getGameDetails = async (slug) => {
    return await axiosInstance
        .get(`${GET_GAMES}/${slug}?key=${apiKEY}`)
        .then((res) => res.data);
};

export const getStores = async (slug) => {
    return await axiosInstance
        .get(`${GET_GAMES}/${slug}/stores?key=${apiKEY}`)
        .then((res) => res.data);
};

export const getScreenShots = async (slug) => {
    return await axiosInstance
        .get(`${GET_GAMES}/${slug}/screenshots?key=${apiKEY}`)
        .then((res) => res.data);
};

export const getAchievements = async ({ slug, pageParam }) => {
    return await axiosInstance
        .get(
            `${GET_GAMES}/${slug}/achievements?key=${apiKEY}&page=${pageParam}&page_size=6`
        )
        .then((res) => res.data);
};

export const getDLCAndEditions = async (slug) => {
    return await axiosInstance
        .get(`${GET_GAMES}/${slug}/additions?key=${apiKEY}`)
        .then((res) => res.data);
};

export const getGameSeries = async (slug) => {
    return await axiosInstance
        .get(`${GET_GAMES}/${slug}/game-series?key=${apiKEY}`)
        .then((res) => res.data);
};

export const getTrailers = async (slug) => {
    return await axiosInstance
        .get(`${GET_GAMES}/${slug}/movies?key=${apiKEY}`)
        .then((res) => res.data);
};
