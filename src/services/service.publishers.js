import axiosInstance from "@/utils/axiosInstance"
import { apiKEY } from "@/constants/api";
import { GET_PUBLISHERS, GET_GAMES } from "@/constants/api";

export const getPublishers = async (pageParam) => {
    return await axiosInstance.get(`${GET_PUBLISHERS}?key=${apiKEY}&page=${pageParam}`).then(res => res.data);
};

export const getPublishersDetails = async (slug) => {
    return await axiosInstance.get(`${GET_PUBLISHERS}/${slug}?key=${apiKEY}`).then(res => res.data);
}

export const getPublishersGames = async (slug, pageParam) => {
    return await axiosInstance.get(`${GET_GAMES}?key=${apiKEY}&publishers=${slug}&page=${pageParam}`).then(res => res.data);
};