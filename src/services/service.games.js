import axiosInstance from "@/utils/axiosInstance"
import { apiKEY } from "@/constants/api";
import { GET_GAMES } from "@/constants/api";

export const getGames = async (pageParam) => {
    return await axiosInstance.get(`${GET_GAMES}/lists/main?key=${apiKEY}&discover=true&ordering=-relevance&page=${pageParam}`).then(res => res.data);
};