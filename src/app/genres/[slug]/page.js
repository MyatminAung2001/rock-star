"use client"

import { useRouter } from "next/navigation";
import { useQuery } from "react-query";

const GenreDetails = () => {

    const router = useRouter();

    

    // const { isLoading, isError, data } = useQuery(["genres-detail", id])

    return (
        <div>
            <p className="text-primary-white pt-16">
                Details Page
            </p>
        </div>
    );
}

export default GenreDetails;