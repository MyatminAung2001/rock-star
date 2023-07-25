import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Best of the Year",
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default Layout;
