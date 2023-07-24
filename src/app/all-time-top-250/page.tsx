"use client";

import GameCard from "@/components/Card/GameCard";
import { FetchingNextPage } from "@/components/Common/Loading";
import Loading from "./loading";
import useAllTimeTop from "./useAllTimeTop";
import options from "@/constants/options";

const AllTimeTop = () => {
    const {
        isLoading,
        isError,
        isFetchingNextPage,
        hasNextPage,
        formattedData,
        filterText,
        isDropDownOpen,
        ref,
        handleDropDown,
        handleFilter,
    } = useAllTimeTop();

    if (isLoading) return <Loading />;

    if (isError) return <p>Error...</p>;

    return (
        <div className="default-section-padding">
            <div className="mb-3 flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
                <p className="heading mb-3">All time top 250</p>
                <div className="relative">
                    <button
                        type="button"
                        onClick={handleDropDown}
                        className="text-primary-white w-[210px] flex items-center justify-between bg-[#212529] px-4 py-2 rounded-md"
                    >
                        Order by {filterText}{" "}
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
                                            onClick={() => handleFilter(opt)}
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
                    <GameCard key={data.id} data={data} />
                ))}
            </div>

            <div ref={ref}>
                {hasNextPage ? (
                    isFetchingNextPage && <FetchingNextPage />
                ) : (
                    <p className="text-white text-center mt-3">
                        No More Results
                    </p>
                )}
            </div>
        </div>
    );
};

export default AllTimeTop;
