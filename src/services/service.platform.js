import axiosInstance from "@/utils/axiosInstance"
import { apiKEY } from "@/constants/api";
import { GET_PLATFORMS } from "@/constants/api";

export const getPlatforms = async () => {
    return await axiosInstance.get(`${GET_PLATFORMS}?key=${apiKEY}`).then(res => res.data);
};