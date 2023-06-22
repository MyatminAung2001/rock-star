import SkeletonLoader from "@/components/Common/SkeletonLoader";

const Loading = () => {
    return (
        <div className="default-section-padding">
            <div className="mb-3 flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
                <SkeletonLoader className="h-[40px] w-[330px] mb-3 rounded-md bg-card-bg-color" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
                    <SkeletonLoader
                        key={n}
                        className="lg:2xlw-[326px] 2xl:w-[393.25px] h-[325.19px] rounded-xl bg-card-bg-color"
                    />
                ))}
            </div>
        </div>
    );
};

export default Loading;
