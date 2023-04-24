import * as endpoints from "@/constants/api";
import axiosInstance from "@/utils/axiosInstance"

export const getGenres = async (data) => {
    return (await axiosInstance.get(endpoints.GET_GENRES, data)).data;
};