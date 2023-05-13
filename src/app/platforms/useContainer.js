import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

import { getPlatforms } from "@/services/service.platform";

const useContainer = () => {
    const router = useRouter();

    const {
        isLoading,
        isError,
        data: platforms,
    } = useQuery("platforms", getPlatforms);

    return {
        router,
        isLoading,
        isError,
        platforms,
    };
};

export default useContainer;
