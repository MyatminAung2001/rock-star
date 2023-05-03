import Link from "next/link";
import { usePathname } from "next/navigation";

const NavItem = ({
    href,
    activeIcon,
    icon,
    title
}) => {

    const pathname = usePathname();

    return (
        <Link href={href} className="flex items-center gap-x-2 py-1 rounded-md">
            {pathname.startsWith(href) ? (
                <div className="bg-[#FFFFFF] rounded p-2">
                    {activeIcon}
                </div>
            ) : (
                <div className="bg-[#202020] rounded p-2">
                    {icon}
                </div>
            )}
            <p className="text-primary-white">
                {title}
            </p>
        </Link>
    );
}

export default NavItem;