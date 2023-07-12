interface Props {
    className: string;
}

const SkeletonLoader = ({ className }: Props) => {
    return <div className={`animate-skeleton ${className}`} />;
};

export default SkeletonLoader;
