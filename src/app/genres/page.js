"use client"

import { useQuery } from 'react-query';

import { NUMBER_OF_ITEMS } from '@/constants/numberOfItems';
import { getGenres } from '@/services/services.genres';

// icons
import GenreIcon from '@/assets/icons/GenreIcon';

const Genres = () => {

    const { isLoading, isError, data: genresData } = useQuery("genres", getGenres);

    console.log(genresData);

    return (
        <div className="default-section-padding w-[100%]">
            <div className="flex items-center justify-center gap-x-2 mb-5">
                <GenreIcon />
                <header className="heading"> 
                    Genres
                </header>
            </div>
            <div className="grid grid-cols-1 gap-y-3">
                {genresData?.results?.map(data => (
                    <div 
                        key={data.id} 
                        className="w-[100%] h-[230px] flex items-center justify-center relative"
                    >
                        <span 
                            style={{
                                content: "",
                                backgroundImage: `url(${data.image_background})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                position: "absolute",
                                top: "0px",
                                right: "0px",
                                left: "0px",
                                bottom: "0px",
                                opacity: 0.40,
                                borderRadius: "0.5rem"
                            }}
                        />
                        <div className="w-[100%] px-6 relative h-full flex flex-col justify-evenly bg-[#00000030]">
                            <p className="text-white text-lg font-semibold tracking-wider text-center underline">
                                {data.name}
                            </p>
                            <div>
                                <div className="flex items-center justify-between">
                                    <p className="text-secondary-white text-sm font-semibold">
                                        Total Games:
                                    </p>
                                    <p className="text-secondary-gray">
                                        {data.games_count}
                                    </p>
                                </div>
                                <hr className="my-3" />
                                {data.games?.slice(0, NUMBER_OF_ITEMS)?.map(data => (
                                    <div key={data.id} className="flex items-center justify-between gap-y-1">
                                        <p className="text-secondary-white font-light underline text-sm">
                                            {data.name}
                                        </p>
                                        <p className="text-secondary-gray text-sm">
                                            {data.added}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Genres;