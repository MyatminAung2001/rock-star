import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

import { getGenres } from "@/services/service.genres";

const useContainer = () => {
    const router = useRouter();

    const { isLoading, isError, data: genres } = useQuery("genres", getGenres);

    return {
        router,
        isLoading,
        isError,
        genres,
    };
};

export default useContainer;
