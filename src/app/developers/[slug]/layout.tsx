import { Metadata } from "next";

import { fetchDeveloperDetails } from "@/api/developers/developer-details.query";

type Props = {
    params: {
        slug: string;
    };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const { params } = props;

    const developers = await fetchDeveloperDetails(params.slug);

    return {
        title: `Developers - ${developers.name}`,
    };
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default Layout;
