import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

function isValidString(str: string) {
    // Check for valid UTF-8 characters
    if (!/^[\u0000-\uFFFF]*$/.test(str)) {
        return false;
    }

    // Check for length
    if (Buffer.byteLength(str, "utf8") > 1500) {
        return false;
    }

    // Check for forward slash
    if (str.includes("/")) {
        return false;
    }

    // Check for single or double periods
    if (str === "." || str === "..") {
        return false;
    }

    // Check against the regular expression __.*__
    if (/__.*__/.test(str)) {
        return false;
    }

    return true;
}
