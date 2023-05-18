"use client";

import GameCard from "@/components/Common/GameCard";
import { Loading, FetchingNextPage } from "@/components/Common/Loading";
import useContainer from "./useContainer";

const NewAndTrending = () => {
    const {
        router,
        ref,
        isLoading,
        isError,
        isFetchingNextPage,
        formattedData,
        options,
        isDropDownOpen,
        setIsDropDownOpen,
        option,
        setOption,
    } = useContainer();

    if (isLoading) return <Loading />;

    return (
        <div className="default-section-padding">
            <div className="mb-3 flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
                <div>
                    <p className="heading mb-3">New and trending</p>
                    <p className="text-primary-white text-center md:text-start mb-3">
                        Based on player counts and rating
                    </p>
                </div>
                <div className="relative">
                    <button
                        type="button"
                        onClick={() =>
                            setIsDropDownOpen((prevState) => !prevState)
                        }
                        className="text-primary-white flex items-center gap-x-4 bg-[#212529] px-4 py-2 rounded-md"
                    >
                        Order by {option}{" "}
                        <svg
                            className={`ml-2 h-4 w-4 transition-all duration-300 ${
                                isDropDownOpen && "rotate-180"
                            }`}
                            aria-hidden="true"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {isDropDownOpen && (
                        <div className="absolute mt-1 right-0 z-10 w-full divide-y divide-gray-100 overflow-hidden rounded-lg bg-white shadow dark:bg-gray-700 md:w-52">
                            <ul className="w-full divide-y divide-primary-dark text-sm text-gray-700 dark:text-gray-200">
                                {options.map((opt) => (
                                    <li key={opt} className="w-full">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setOption(opt);
                                                setIsDropDownOpen(
                                                    (prevState) => !prevState
                                                );
                                            }}
                                            className="w-full p-4 capitalize hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            {opt}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {formattedData?.map((data) => (
                    <div
                        key={data.id}
                        ref={ref}
                        onClick={() => router.push(`games/${data.slug}`)}
                    >
                        <GameCard data={data} />
                    </div>
                ))}
            </div>
            {isFetchingNextPage && <FetchingNextPage />}
        </div>
    );
};

export default NewAndTrending;
