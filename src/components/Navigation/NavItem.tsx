import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
    href: string;
    activeIcon: any;
    icon: any;
    title: string;
}

const NavItem = ({ href, activeIcon, icon, title }: Props) => {
    const pathname = usePathname();

    return (
        <Link href={href} className="flex items-center gap-x-2 py-1 rounded-md">
            {pathname.startsWith(href) ? (
                <div className="bg-primary-bg-white rounded p-2">
                    {activeIcon}
                </div>
            ) : (
                <div className="bg-secondary-bg-black rounded p-2">{icon}</div>
            )}
            <p className="text-primary-white text-base font-light">{title}</p>
        </Link>
    );
};

export default NavItem;
