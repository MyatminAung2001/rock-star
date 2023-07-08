import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getPlatforms } from "@/services/service.platform";

const useContainer = () => {
    const router = useRouter();

    const {
        data: platforms,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ["platforms"],
        queryFn: () => getPlatforms(),
    });

    return {
        router,
        isLoading,
        isError,
        platforms,
    };
};

export default useContainer;
