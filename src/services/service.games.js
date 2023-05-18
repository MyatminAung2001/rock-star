import axiosInstance from "@/utils/axiosInstance";
import { apiKEY } from "@/constants/api";
import { GET_GAMES } from "@/constants/api";

export const getAllGames = async (pageParam) => {
    return await axiosInstance
        .get(
            `${GET_GAMES}?key=${apiKEY}&discover=true&ordering=-relevance&page=${pageParam}&page_size=12`
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

export const getNewAndTrending = async ({ pageParam, option }) => {
    return await axiosInstance
        .get(
            `${GET_GAMES}/lists/main?key=${apiKEY}&discover=true&ordering=-${option}&page=${pageParam}&page_size=12`
        )
        .then((res) => res.data);
};

export const getBestOfTheYear = async (pageParam) => {
    return await axiosInstance
        .get(
            `${GET_GAMES}/lists/greatest?key=${apiKEY}&discover=true&page=${pageParam}&page_size=12
    `
        )
        .then((res) => res.data);
};

export const getPopularIn2022 = async (pageParam) => {
    return await axiosInstance
        .get(
            `${GET_GAMES}/lists/greatest?key=${apiKEY}&year=2022&discover=true&page=${pageParam}&page_size=12
    `
        )
        .then((res) => res.data);
};

export const getAllTimeTop250 = async (pageParam) => {
    return await axiosInstance
        .get(
            `${GET_GAMES}/lists/popular?key=${apiKEY}&discover=true&page=${pageParam}&page_size=12
    `
        )
        .then((res) => res.data);
};
