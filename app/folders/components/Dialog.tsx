"use client";

import { cn } from "@/lib/utils";
import React, { useEffect } from "react";

export default function Dialog({
    title,
    children,
    onConfirm,
    open,
    setOpen,
}: {
    title: string;
    children: React.ReactNode;
    onConfirm: () => void;
    open: boolean;
    setOpen: (open: boolean) => void;
}) {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [setOpen]);

    return (
        <div
            className={cn(
                "fixed top-0 left-0 w-full h-full transition-all transform grid place-items-center z-50",
                open
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-75 select-none pointer-events-none"
            )}>
            <div
                className="outer absolute top-0 left-0 w-full h-full z-10 bg-black/35"
                onClick={() => {
                    setOpen(false);
                }}></div>
            <form
                onSubmit={e => {
                    e.preventDefault();
                    setOpen(false);
                    onConfirm();
                }}
                className="inner w-[500px] primary-border py-3 bg-blue-950 px-4 z-20">
                <h1 className="text-2xl font-bold my-3">{title}</h1>
                <div className="my-4">{children}</div>
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => {
                            setOpen(false);
                        }}
                        className="primary-border p-2 py-1 !rounded-md bg-black">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="primary-border p-2 py-1 !rounded-md bg-primary">
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    );
}
