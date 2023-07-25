import { Metadata } from "next";

const previousYear = new Date().getFullYear() - 1;

export const metadata: Metadata = {
    title: `Popular in ${previousYear}`,
};

const Layout = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

export default Layout;
