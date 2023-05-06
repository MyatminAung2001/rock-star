import { getGameDetails } from "@/services/service.details";
import { useParams } from "next/navigation";
import { useQueries } from "react-query";

const Page = () => {

    const { slug } = useParams();

    const queryResults = useQueries([
        {
            queryKey: "details",
            queryFn: () => getGameDetails(slug)
        }
    ]);

    console.log(queryResults);

    return (
        <div className="default-section-padding">
            <span style={{
                content: "",
                backgroundImage: `
                    linear-gradient(rgba(21, 21, 21, 0), rgb(21, 21, 21)),
                    linear-gradient(rgba(21, 21, 21, 0.8), rgba(21, 21, 21, 0.5)),
                
                `,
                backgroundSize: "cover",
                backgroundPosition: "top",
                backgroundColor: "transparent",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                zIndex: "-10",
                inset: "0",
                height: "500px",
                maxHeight: "100%"
            }} />
            {/* <div className="mb-5">
                <div className="flex flex-col items-center lg:items-start">
                    {creatorsDetail?.image && (
                        <Image 
                            src={creatorsDetail.image}
                            alt={creatorsDetail?.name}
                            width={90}
                            height={90}
                            className="rounded-full mb-5"
                        />
                    )}
                    <p className="heading mb-2">
                        {creatorsDetail?.name}
                    </p>    
                    {creatorsDetail?.positions && (
                        <div className="flex items-center justify-center gap-x-2 mb-5">
                            {creatorsDetail?.positions.map((data, i, arr) => (
                                <p key={data.id} className="text-white text-lg first-letter:uppercase font-light">
                                    {data.name}{i != arr.length - 1 ? ", " : " "}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
                <p className="text-primary-white text-[14px] lg:text-[16px] font-light">
                    {description}
                </p>
            </div> */}
        </div>
    );
}

export default Page;