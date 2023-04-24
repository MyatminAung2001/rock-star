"use client"

import { useQuery } from 'react-query';

import { getGenres } from '@/services/services.genres';

const Genres = () => {

    const { isLoading, isError, data: genresData } = useQuery("genres", getGenres);

    console.log(genresData);

    return (
        <div>
            {genresData?.results?.map(data => (
                <p key={data.id} className="text-primary-white">
                    {data.name}
                </p>
            ))}
        </div>
    );
}

export default Genres;