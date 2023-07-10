import {
    AppleStore,
    EpicGamesStore,
    Steam,
    PlayStationStore,
    XboxStore,
    GooglePlayStore,
    NintendoStore,
    ItchIo,
    GogStore,
} from "@/utils/storeSVG";

const storesData = [
    { id: 1, name: "Steam", icon: <Steam /> },
    { id: 3, name: "Playstation Store", icon: <PlayStationStore /> },
    { id: 2, name: "Xbox Store", icon: <XboxStore /> },
    { id: 4, name: "Apple Store", icon: <AppleStore /> },
    { id: 5, name: "Gog Store", icon: <GogStore /> },
    { id: 6, name: "Nintendo Store", icon: <NintendoStore /> },
    { id: 7, name: "Xbox 360 Store", icon: <XboxStore /> },
    { id: 8, name: "Google Play", icon: <GooglePlayStore /> },
    { id: 9, name: "Itch.io", icon: <ItchIo /> },
    { id: 11, name: "Epic Games", icon: <EpicGamesStore /> },
];

export default storesData;
