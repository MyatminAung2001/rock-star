"use client";

import { useState } from "react";

interface Props {
    description: string;
    title: string;
}

const Description = ({ description, title }: Props) => {
    const [isSeeMore, setIsSeeMore] = useState(false);

    const handleFormatDescription = (desc: string) => {
        const newDes = desc.replace(/#{3}\w+/g, (match) => {
            return match.replace(/#{3}/g, "").toUpperCase();
        });

        return newDes;
    };

    return (
        <div className="mb-2">
            <p className="mb-2 text-primary-white text-lg tracking-wide">
                {title}
            </p>
            <div className={isSeeMore ? "descirption full" : "description"}>
                <p className="text-primary-white tracking-wide text-sm font-light whitespace-pre-wrap">
                    {description ? handleFormatDescription(description) : "N/A"}
                </p>
            </div>
            {description && (
                <button
                    onClick={() => setIsSeeMore(!isSeeMore)}
                    className="text-[12px] bg-primary-bg-white text-primary-bg-black px-2 rounded"
                >
                    {isSeeMore ? "Show Less" : "Show More"}
                </button>
            )}
        </div>
    );
};

export default Description;
