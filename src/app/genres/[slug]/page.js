"use client"

import { getGenresDetails } from "@/services/services.genres";
import { useParams } from "next/navigation";
import { useQuery } from "react-query";

const GenreDetails = () => {

    const { slug } = useParams();

    const { isLoading, isError, data: genreDetails } = useQuery(["genres-detail", slug], () => getGenresDetails(slug));

    const myString = genreDetails?.description;
    const description = myString?.replace(/<p>|<\/p>/gi, '')

    return (
        <div className="default-section-padding">
            <p className="heading">
                {genreDetails?.name}
            </p>
            <p className="text-primary-white text-[16px]">
                {description}
            </p>
        </div>
    );
}

export default GenreDetails;