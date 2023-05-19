import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getStores } from "@/services/service.stores";

const useContainer = () => {
    const router = useRouter();

    const {
        data: stores,
        isError,
        isLoading,
    } = useQuery({
        queryKey: ["stores"],
        queryFn: () => getStores(),
    });

    return {
        router,
        isLoading,
        isError,
        stores,
    };
};

export default useContainer;
