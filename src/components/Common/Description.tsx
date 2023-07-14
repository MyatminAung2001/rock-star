"use client";

import { useState } from "react";

interface Props {
    description: string;
    title: string;
}

const Description = ({ description, title }: Props) => {
    const [showFullDescription, setShowFullDescription] = useState(false);

    const toggleDescription = () => {
        setShowFullDescription(!showFullDescription);
    };

    const renderDescription = () => {
        if (description.length <= 200) {
            return description;
        }

        if (description.length > 200) {
            if (showFullDescription) {
                return (
                    <>
                        {description}
                        <button
                            onClick={toggleDescription}
                            className="ml-2 text-sm text-primary-yellow"
                        >
                            See less
                        </button>
                    </>
                );
            } else {
                const truncDescription = description.substring(0, 200) + "...";
                return (
                    <>
                        {truncDescription.length === 200 ? (
                            truncDescription
                        ) : (
                            <>
                                {truncDescription}
                                <button
                                    onClick={toggleDescription}
                                    className="ml-2 text-sm text-primary-yellow"
                                >
                                    See more
                                </button>
                            </>
                        )}
                    </>
                );
            }
        }
    };

    return (
        <div className="mb-2">
            <p className="mb-2 text-primary-white text-lg tracking-wide">
                {title}
            </p>
            <div className="text-primary-white">{renderDescription()}</div>
        </div>
    );
};

export default Description;
