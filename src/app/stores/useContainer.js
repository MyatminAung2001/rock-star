import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

import { getStores } from "@/services/service.stores";

const useContainer = () => {
    const router = useRouter();

    const { isLoading, isError, data: stores } = useQuery("stores", getStores);

    return {
        router,
        isLoading,
        isError,
        stores,
    };
};

export default useContainer;
