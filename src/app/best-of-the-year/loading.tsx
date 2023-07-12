import SkeletonLoader from "@/components/Common/SkeletonLoader";

const Loading = () => {
    return (
        <div className="default-section-padding">
            <div className="mb-3 flex flex-col lg:flex-row items-center lg:items-start lg:justify-between">
                <SkeletonLoader className="h-[40px] w-[330px] mb-3 rounded-md bg-card-bg-color" />
                <SkeletonLoader className="h-[40px] w-[210px] rounded-md bg-card-bg-color" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
                {[...Array(9)].map((n) => (
                    <SkeletonLoader
                        key={n}
                        className="lg:2xlw-[326px] 2xl:w-[393.25px] h-[414.97px] rounded-xl bg-card-bg-color"
                    />
                ))}
            </div>
        </div>
    );
};

export default Loading;
