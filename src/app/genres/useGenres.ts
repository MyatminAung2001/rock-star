import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { useGetGenres } from "@/api/genres/genres.query";

const useGenres = () => {
    const router = useRouter();

    const { data, isLoading, isError } = useGetGenres();

    return {
        router,
        isLoading,
        isError,
        data,
    };
};

export default useGenres;
