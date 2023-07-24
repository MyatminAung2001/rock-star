import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Stores",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default Layout;
