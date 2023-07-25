import { Metadata } from "next";

import { fetchPublisherDetails } from "@/api/publisher/publisher-details.query";

type Props = {
    params: {
        slug: string;
    };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const { params } = props;

    const publishers = await fetchPublisherDetails(params.slug);

    return {
        title: `Publishers - ${publishers.name}`,
    };
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default Layout;
