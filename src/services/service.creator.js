import axiosInstance from "@/utils/axiosInstance";
import { apiKEY } from "@/constants/api";
import { GET_CREATORS, GET_GAMES } from "@/constants/api";

export const getCreators = async (pageParam) => {
    return await axiosInstance
        .get(`${GET_CREATORS}?key=${apiKEY}&page=${pageParam}&page_size=12`)
        .then((res) => res.data);
};

export const getCreatorsDetails = async (slug) => {
    return await axiosInstance
        .get(`${GET_CREATORS}/${slug}?key=${apiKEY}`)
        .then((res) => res.data);
};

export const getCreatorsGames = async ({ slug, pageParam }) => {
    return await axiosInstance
        .get(
            `${GET_GAMES}?key=${apiKEY}&creators=${slug}&page=${pageParam}&page_size=12`
        )
        .then((res) => res.data);
};
