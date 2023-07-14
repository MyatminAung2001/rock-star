import { dehydrate } from "@tanstack/react-query";

import getQueryClient from "@/utils/getQueryCilent";
import Hydrate from "@/utils/hydrateOnClient";
import { getPopularIn2022 } from "@/services/service.games";
import PopularLastYear from "./popularLastYear";

const previousYear = new Date().getFullYear() - 1;

export const metadata = {
    title: `Popular in ${previousYear}`,
    description: "Generated by create next app",
};

export default async function Page() {
    const queryClient = getQueryClient();

    await queryClient.prefetchInfiniteQuery({
        queryKey: ["popular-in-2022"],
        queryFn: ({ pageParam = 1 }) => getPopularIn2022(pageParam),
    });

    const dehydrateState = dehydrate(queryClient);

    return (
        <Hydrate state={dehydrateState}>
            <PopularLastYear />
        </Hydrate>
    );
}
