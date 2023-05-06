"use client"

import { useRouter } from "next/navigation";

const Tags = ({ tags }) => {

    const router = useRouter();

    return (
        <div className="mb-2">
            <p className="mb-2 text-primary-white text-lg tracking-wide">
                Tags
            </p>
            <div className="flex flex-wrap gap-2 break-words">
                {tags.map(tag => (
                    <p 
                        onClick={() => router.push(`tags/${tag.slug}`)}
                        key={tag.id} 
                        className="text-[14px] border rounded px-2 text-primary-white border-primary-bg-yellow cursor-pointer"
                    >
                        {tag.name}
                    </p>
                ))}
            </div>
        </div>
    );
}

export default Tags;