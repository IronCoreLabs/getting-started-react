import spock from "./avatars/spock.jpg";
import mccoy from "./avatars/mccoy.jpg";
import sulu from "./avatars/sulu.jpg";
import redshirt from "./avatars/redshirt.jpg";
import chekov from "./avatars/chekov.jpg";
import kirk from "./avatars/kirk.jpg";
import uhura from "./avatars/uhura.jpg";

export const KIRK = 1;
export const MCCOY = 2;
export const SULU = 3;
export const CHEKOV = 4;
export const SPOCK = 5;
export const UHURA = 6;
export const REDSHIRT = 7;

export const Users = {
    [KIRK]: {
        id: KIRK,
        name: "Kirk",
        img: kirk,
    },
    [MCCOY]: {
        id: MCCOY,
        name: "McCoy",
        img: mccoy,
    },
    [SULU]: {
        id: SULU,
        name: "Sulu",
        img: sulu,
    },
    [CHEKOV]: {
        id: CHEKOV,
        name: "Chekov",
        img: chekov,
    },
    [SPOCK]: {
        id: SPOCK,
        name: "Spock",
        img: spock,
    },
    [UHURA]: {
        id: UHURA,
        name: "Uhura",
        img: uhura,
    },
    [REDSHIRT]: {
        id: REDSHIRT,
        name: "RedShirt",
        img: redshirt,
    },
};
