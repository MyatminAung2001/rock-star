import { Metadata } from "next";

import { fetchCreatorDetails } from "@/api/creator/creator-detail.query";

type Props = {
    params: {
        slug: string;
    };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const { params } = props;

    const creators = await fetchCreatorDetails(params.slug);

    return {
        title: `Creators - ${creators.name}`,
    };
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default Layout;
