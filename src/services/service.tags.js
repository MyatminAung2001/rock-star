import axiosInstance from "@/utils/axiosInstance"
import { apiKEY } from "@/constants/api";
import { GET_TAGS, GET_GAMES } from "@/constants/api";

export const getTags = async (pageParam) => {
    return await axiosInstance.get(
        `${GET_TAGS}?key=${apiKEY}&page=${pageParam}&page_size=12`
    ).then(res => res.data);
};

export const getTagsDetails = async (slug) => {
    return await axiosInstance.get(
        `${GET_TAGS}/${slug}?key=${apiKEY}`
    ).then(res => res.data);
}

export const getTagsGames = async (slug, pageParam) => {
    return await axiosInstance.get(
        `${GET_GAMES}?key=${apiKEY}&tags=${slug}&page=${pageParam}&page_size=12`
    ).then(res => res.data);
};