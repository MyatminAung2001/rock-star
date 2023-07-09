import SkeletonLoader from "@/components/Common/SkeletonLoader";

const Loading = () => {
    return (
        <div className="default-section-padding">
            {[...Array(4)].map((_, index) => (
                <div key={index} className="mb-6">
                    <SkeletonLoader className="h-[40px] w-[300px] mb-3 rounded-md bg-card-bg-color mx-auto lg:mx-0" />
                    <div className="flex items-center gap-x-3 sm:hidden">
                        <SkeletonLoader className="h-[326.88px] w-[300px] mb-3 rounded-xl bg-card-bg-color" />
                        <SkeletonLoader className="h-[326.88px] w-[50px] mb-3 rounded-l-xl bg-card-bg-color" />
                    </div>
                    <div className="sm:flex items-center gap-x-3 hidden lg:hidden">
                        {[...Array(2)].map((_, index) => (
                            <SkeletonLoader
                                key={index}
                                className="h-[326.88px] w-[300px] mb-3 rounded-xl bg-card-bg-color"
                            />
                        ))}
                        <SkeletonLoader className="h-[326.88px] w-[160px] mb-3 rounded-l-xl bg-card-bg-color" />
                    </div>
                    <div className="lg:flex items-center gap-x-3 hidden sm:hidden 2xl:hidden">
                        {[...Array(3)].map((_, index) => (
                            <SkeletonLoader
                                key={index}
                                className="h-[376.88px] w-[350px] mb-3 rounded-xl bg-card-bg-color"
                            />
                        ))}
                        <SkeletonLoader className="h-[376.88px] w-[60px] mb-3 rounded-l-xl bg-card-bg-color" />
                    </div>
                    <div className="2xl:flex items-center gap-x-3 hidden sm:hidden lg:hidden">
                        {[...Array(4)].map((_, index) => (
                            <SkeletonLoader
                                key={index}
                                className="h-[376.88px] w-[350px] mb-3 rounded-xl bg-card-bg-color"
                            />
                        ))}
                        <SkeletonLoader className="h-[376.88px] w-[170px] mb-3 rounded-l-xl bg-card-bg-color" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Loading;
