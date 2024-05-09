import React from "react";
import { Roboto } from "next/font/google";
import { cn } from "@/lib/utils";
import LoginButton from "./components/LoginButton";

const font = Roboto({ subsets: ["latin"], weight: ["400"] });

export default function LoginPage() {
    return (
        <div
            className={cn(
                "w-full h-full grid place-items-center",
                font.className
            )}>
            <LoginButton />
        </div>
    );
}
