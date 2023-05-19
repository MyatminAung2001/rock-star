import axiosInstance from "@/utils/axiosInstance";
import { apiKEY } from "@/constants/api";
import { GET_STORES, GET_GAMES } from "@/constants/api";

export const getStores = async () => {
    return await axiosInstance
        .get(`${GET_STORES}?key=${apiKEY}`)
        .then((res) => res.data);
};

export const getStoresDetails = async (id) => {
    return await axiosInstance
        .get(`${GET_STORES}/${id}?key=${apiKEY}`)
        .then((res) => res.data);
};

export const getStoresGames = async ({ id, pageParam }) => {
    return await axiosInstance
        .get(
            `${GET_GAMES}?key=${apiKEY}&stores=${id}&page=${pageParam}&page_size=12`
        )
        .then((res) => res.data);
};
