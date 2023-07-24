import { Metadata } from "next";

import { fetchTagDetails } from "@/api/tags/tag-details.query";

type Props = {
    params: {
        slug: string;
    };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const { params } = props;

    const tagDetails = await fetchTagDetails(params.slug);

    return {
        title: `Tags - ${tagDetails.name}`,
    };
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default Layout;
