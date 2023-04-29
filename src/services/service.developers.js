import axiosInstance from "@/utils/axiosInstance"
import { apiKEY } from "@/constants/api";
import { GET_DEVELOPERS, GET_GAMES } from "@/constants/api";

export const getDevelopers = async (pageParam) => {
    return await axiosInstance.get(`${GET_DEVELOPERS}?key=${apiKEY}&page=${pageParam}`).then(res => res.data);
};

export const getDevelopersDetails = async (slug) => {
    return await axiosInstance.get(`${GET_DEVELOPERS}/${slug}?key=${apiKEY}`).then(res => res.data);
}

export const getDevelopersGames = async (slug, pageParam) => {
    return await axiosInstance.get(`${GET_GAMES}?key=${apiKEY}&developers=${slug}&page=${pageParam}`).then(res => res.data);
};