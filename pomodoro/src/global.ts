import { atom } from "recoil";

// default 25 minutes
export const IsPlaying = atom<boolean>({
    key: "IsPlaying",
    default: false,
});
