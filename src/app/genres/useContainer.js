import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getGenres } from "@/services/service.genres";

const useContainer = () => {
    const router = useRouter();

    const {
        data: genres,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ["genres"],
        queryFn: () => getGenres(),
    });

    return {
        router,
        isLoading,
        isError,
        genres,
    };
};

export default useContainer;
