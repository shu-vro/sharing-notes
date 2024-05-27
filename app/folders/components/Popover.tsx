import { cn } from "@/lib/utils";
import React from "react";

export const localClasses = {
    Buttons:
        "block w-full text-start primary-border mb-4 rounded-2xl p-3 transition-all duration-300 ease-in-out hover:bg-[dodgerblue]",
};

export default function Popover({
    toggle,
    setToggle,
    children,
}: {
    toggle: boolean;
    setToggle: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
}) {
    return (
        <>
            <div
                className={cn(
                    "popOver absolute right-3 px-3 py-2 top-10 w-max primary-border rounded-2xl bg-[var(--bg-color)] transform transition-all duration-300 ease-in-out z-10 origin-top-right",
                    toggle
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-75 select-none pointer-events-none"
                )}>
                {children}
            </div>
            {toggle && (
                <div
                    className="overlay fixed top-0 left-0 w-full h-full z-[9]"
                    onClick={() => {
                        setToggle(!toggle);
                    }}></div>
            )}
        </>
    );
}
