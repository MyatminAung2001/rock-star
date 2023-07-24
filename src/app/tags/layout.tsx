import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tags",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default Layout;
