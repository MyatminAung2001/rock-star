import { useRouter } from "next/navigation";

import { useGetStores } from "@/api/stores/stores.query";

const useStores = () => {
    const router = useRouter();

    const { data, isLoading, isError } = useGetStores();

    return {
        router,
        isLoading,
        isError,
        data,
    };
};

export default useStores;
