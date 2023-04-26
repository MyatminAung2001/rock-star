"use client"

import { useState } from "react";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";

import { getGenresDetails } from "@/services/services.genres";

const GenreDetails = () => {

    const { slug } = useParams();

    const { isLoading, isError, data: genreDetails } = useQuery(["genres-detail", slug], () => getGenresDetails(slug));

    // content
    // remove p tag from a string
    const myString = genreDetails?.description;
    const description = myString?.replace(/<p>|<\/p>/gi, '');

    // control read more state
    const [showFullContent, setShowFullContent] = useState(false);

    const cutOff = 165;

    const displayContent = description?.length <= cutOff || showFullContent 
        ? description 
        : `${description?.substring(0, cutOff)}`;

    return (
        <div className="default-section-padding">
            <p className="heading mb-5">
                {genreDetails?.name} Games
            </p>
            <p className="text-primary-white text-[16px] font-light">
                {displayContent}... {" "}
                {!showFullContent && description?.length > cutOff && (
                    <button 
                        onClick={() => setShowFullContent(true)}
                        className="text-[12px] bg-primary-bg-white text-primary-bg-black px-2 rounded"
                    >
                        read more
                    </button>
                )}
            </p>
        </div>
    );
}

export default GenreDetails;