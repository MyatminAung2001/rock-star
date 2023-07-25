import { Metadata } from "next";

export const metadata: Metadata = {
    title: "All Time Top 250",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default Layout;
