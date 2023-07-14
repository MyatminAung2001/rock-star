interface Props {
    image_background: string | undefined;
}

const BackgroundImage = ({ image_background }: Props) => {
    return (
        <span
            style={{
                content: "",
                backgroundImage: `
                linear-gradient(rgba(21, 21, 21, 0), rgb(21, 21, 21)),
                linear-gradient(rgba(21, 21, 21, 0.5), rgba(21, 21, 21, 0.2)),
                url(${image_background})
            `,
                backgroundSize: "cover",
                backgroundPosition: "top",
                backgroundColor: "transparent",
                backgroundRepeat: "no-repeat",
                position: "absolute",
                zIndex: "-10",
                inset: "0",
                height: "500px",
                maxHeight: "100%",
            }}
        />
    );
};

export default BackgroundImage;
