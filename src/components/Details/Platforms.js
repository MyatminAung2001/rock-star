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
                        className="text-primary-white tracking-wide text-[14px] font-light cursor-pointer hover:text-primary-gray transition duration-300"
                        onClick={() => router.push(`/platforms/${platform.platform.id}`)}
                    >
                        {platform.platform.name}<span className="text-primary-yellow">{i != arr.length - 1 ? " | " : " "}</span>
                    </p>
                ))}
            </div>
        </div>
    );
}

export default Platforms;