import axiosInstance from "@/utils/axiosInstance"
import { apiKEY } from "@/constants/api";
import { GET_TAGS, GET_GAMES } from "@/constants/api";

export const getTags = async (pageParam) => {
    return await axiosInstance.get(`${GET_TAGS}?key=${apiKEY}&page=${pageParam}`).then(res => res.data);
};

export const getTagsDetails = async (id) => {
    return await axiosInstance.get(`${GET_TAGS}/${id}?key=${apiKEY}`).then(res => res.data);
}

export const getTagsGames = async (id, pageParam) => {
    return await axiosInstance.get(`${GET_GAMES}?key=${apiKEY}&stores=${id}&page=${pageParam}`).then(res => res.data);
};