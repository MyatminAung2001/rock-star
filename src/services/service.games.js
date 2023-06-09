import axiosInstance from "@/utils/axiosInstance";
import { apiKEY } from "@/constants/api";
import { GET_GAMES } from "@/constants/api";

export const getAllGames = async ({ pageParam, filterText }) => {
    return await axiosInstance
        .get(
            `${GET_GAMES}?key=${apiKEY}&discover=true&ordering=-${filterText}&page=${pageParam}&page_size=12`
        )
        .then((res) => res.data);
};

export const getSearchGames = async (debounceSearchTerm) => {
    return await axiosInstance
        .get(
            `${GET_GAMES}?key=${apiKEY}&search=${debounceSearchTerm}&ordering=-relevance&page=1&page_size=12`
        )
        .then((res) => res.data);
};

export const getNewAndTrending = async ({ pageParam, filterText }) => {
    return await axiosInstance
        .get(
            `${GET_GAMES}/lists/main?key=${apiKEY}&discover=true&ordering=-${filterText}&page=${pageParam}&page_size=12`
        )
        .then((res) => res.data);
};

export const getBestOfTheYear = async ({ pageParam, filterText }) => {
    return await axiosInstance
        .get(
            `${GET_GAMES}/lists/greatest?key=${apiKEY}&discover=true&ordering=-${filterText}&page=${pageParam}&page_size=12
    `
        )
        .then((res) => res.data);
};

export const getPopularIn2022 = async ({ pageParam, filterText }) => {
    return await axiosInstance
        .get(
            `${GET_GAMES}/lists/greatest?key=${apiKEY}&year=2022&discover=true&ordering=-${filterText}&page=${pageParam}&page_size=12
    `
        )
        .then((res) => res.data);
};

export const getAllTimeTop250 = async ({ pageParam, filterText }) => {
    return await axiosInstance
        .get(
            `${GET_GAMES}/lists/popular?key=${apiKEY}&discover=true&ordering=-${filterText}&page=${pageParam}&page_size=12
    `
        )
        .then((res) => res.data);
};

export const getUpcomingGames = async () => {
    return await axiosInstance
        .get(
            `${GET_GAMES}/lists/main?key=${apiKEY}&ordering=-released&page=1&page_size=12`
        )
        .then((res) => res.data);
};

export const getLast30Days = async () => {
    return await axiosInstance
        .get(
            `${GET_GAMES}/lists/recent-games-past?key=${apiKEY}&ordering=-added&page=1&page_size=12`
        )
        .then((res) => res.data);
};

export const getThisWeek = async () => {
    return await axiosInstance
        .get(
            `${GET_GAMES}/lists/recent-games?key=${apiKEY}&ordering=-added&page=1&page_size=12`
        )
        .then((res) => res.data);
};

export const getNextWeek = async () => {
    return await axiosInstance
        .get(
            `${GET_GAMES}/lists/recent-games-future?key=${apiKEY}&ordering=-added&page=1&page_size=12`
        )
        .then((res) => res.data);
};
