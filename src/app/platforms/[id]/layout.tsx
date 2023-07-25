import { Metadata } from "next";

import { fetchPlatformDetails } from "@/api/platform/platform-detail.query";

type Props = {
    params: {
        id: string;
    };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const { params } = props;

    const platforms = await fetchPlatformDetails(params.id);

    return {
        title: `Platforms - ${platforms.name}`,
    };
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default Layout;
