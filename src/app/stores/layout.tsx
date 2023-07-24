import { Metadata } from "next";
import Stores from "./page";

export const metadata: Metadata = {
    title: "Stores",
};

const Layout = () => {
    return (
        <div>
            <Stores />
        </div>
    );
};

export default Layout;
