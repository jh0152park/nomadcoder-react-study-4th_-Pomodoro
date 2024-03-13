import { atom } from "recoil";

// default 25 minutes

export const Minutes = atom<number>({
    key: "minutes",
    default: 25,
});

export const Seconds = atom<number>({
    key: "seconds",
    default: 0,
});
