import { Metadata } from "next";

import { fetchGenreDetails } from "@/api/genres/genre-detail.query";

type Props = {
    params: {
        slug: string;
    };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const { params } = props;

    const genres = await fetchGenreDetails(params.slug);

    return {
        title: `Genres - ${genres.name}`,
    };
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default Layout;
