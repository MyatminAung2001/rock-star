"use client"

import Image from 'next/image';
import { useQuery } from 'react-query';

import { getGenres } from '@/services/services.genres';

const Genres = () => {

    const { isLoading, isError, data: genresData } = useQuery("genres", getGenres);

    console.log(genresData);

    return (
        <div className="default-section-padding w-[100%]">
            <header className="text-primary-white text-center"> 
                Genres
            </header>
            <div className="grid grid-cols-1 gap-y-3">
                {genresData?.results?.map(data => (
                    <div 
                        key={data.id} 
                        className="w-[100%] h-[220px] rounded-md bg-cover bg-center opacity-30"
                        style={{ backgroundImage: `url(${data.image_background})` }}
                    >
                        <div className="">
                            <p className="text-white text-center underline mt-8 text-fuchsia-600">
                                {data.name}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Genres;