import { fetchStoreDetails } from "@/api/stores/store-detail.query";
import { Metadata } from "next";

type Props = {
    params: {
        id: string;
    };
};

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const { params } = props;

    const stores = await fetchStoreDetails(params.id);

    return {
        title: `Stores - ${stores.name}`,
    };
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default Layout;
