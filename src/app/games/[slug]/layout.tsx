import { fetchGamesDetail } from "@/api/details/game-details-query";
import { Metadata } from "next";

type Props = {
    params: {
        slug: string;
    };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const { params } = props;

    const games = await fetchGamesDetail(params.slug);

    return {
        title: `Games - ${games.name}`,
    };
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default Layout;
