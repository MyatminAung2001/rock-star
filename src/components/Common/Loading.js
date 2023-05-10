import { RotatingLines } from "react-loader-spinner";

export const FetchingNextPage = () => {
    return (
        <div className="w-full mt-3 flex items-center justify-center">
            <div className="w-[60px] p-2 bg-[#212529] rounded-md flex items-center justify-center">
                <RotatingLines
                    strokeColor="#B7B5B3"
                    strokeWidth="2"
                    animationDuration="0.75"
                    width="40"
                    visible={true}
                />
            </div>
        </div>
    );
};

export const Loading = () => {
    return (
        <div className="w-[100%] h-screen flex items-center justify-center">
            <RotatingLines
                strokeColor="#B7B5B3"
                strokeWidth="2"
                animationDuration="0.75"
                width="50"
                visible={true}
            />
        </div>
    )
};