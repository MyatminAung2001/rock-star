"use client"

import { useRouter } from "next/navigation";

const Platforms = ({ platforms }) => {

    const router = useRouter();

    return (
        <div className="mb-3">
            <p className="text-primary-white text-lg tracking-wide">
                Platforms
            </p>
            <div className="flex flex-wrap gap-x-1 break-words">
                {platforms?.map((platform, i, arr) => (
                    <p 
                        key={platform.platform.id} 
                        className="text-primary-white tracking-wide text-[14px] font-light cursor-pointer"
                        onClick={() => router.push(`/platforms/${platform.platform.id}`)}
                    >
                        {platform.platform.name}{i != arr.length - 1 ? " | " : " "}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default Platforms;