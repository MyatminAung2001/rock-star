import "./globals.css";

// providers
import { ReactQueryProviders } from "@/utils/reactquery.provider";

import NavigationWeb from "@/components/Navigation/Navigation.web";
import NavigationMobile from "@/components/Navigation/Navigation.mobile";
import SearchBox from "@/components/Common/SearchBox";

export const metadata = {
    title: "BitBazaar | One-stop Destination For All Games!",
    description: `BitBazaar offers an extensive and diverse collection of games and also have a wide range of games available, 
        so you can find the perfect fit for your gaming setup. Whether you're a fan of action-packed shooters, 
        immersive role-playing adventures, mind-bending puzzle games, or thrilling sports simulations, 
        we have something for every gaming taste. Our curated website features both popular AAA titles and hidden indie gems, 
        ensuring that you never run out of exciting games to play.`,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ReactQueryProviders>
                    <NavigationMobile />
                    <section className="lg:flex">
                        <aside className="hidden lg:block lg:fixed lg:left-0 lg:top-0 lg:h-screen lg:p-4 lg:w-60">
                            <NavigationWeb />
                        </aside>
                        <div className="lg:flex-1 lg:ml-60">
                            <SearchBox />
                            {children}
                        </div>
                    </section>
                </ReactQueryProviders>
            </body>
        </html>
    );
}
