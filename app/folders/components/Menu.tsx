"use client";

import React, { useState } from "react";
import { auth } from "@/firebase";
import { cn } from "@/lib/utils";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import LoginButton from "../../login/components/LoginButton";
import { toast } from "sonner";

const localClasses = {
    Buttons:
        "block w-full text-start primary-border mb-4 rounded-2xl p-3 transition-all duration-300 ease-in-out hover:bg-[dodgerblue]",
};

export default function Menu() {
    const [toggle, setToggle] = useState(false);
    const { push } = useRouter();

    if (!auth.currentUser) return <LoginButton />;

    return (
        <div className="rest relative">
            <img
                className="user-profile rounded-full w-10 aspect-square primary-border object-cover cursor-pointer"
                src={auth.currentUser?.photoURL || "/profile.png"}
                alt="profile"
                onClick={() => setToggle(!toggle)}
            />

            <div
                className={cn(
                    "popOver absolute right-3 px-3 py-2 top-10 w-80 primary-border rounded-2xl bg-[var(--bg-color)] transform transition-all duration-300 ease-in-out z-10 origin-top-right",
                    toggle
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-75 select-none pointer-events-none"
                )}>
                <div className="primary-border mb-4 rounded-2xl p-3">
                    {auth.currentUser?.displayName}
                </div>
                <button type="button" className={cn(localClasses.Buttons)}>
                    My Notes
                </button>
                <button
                    type="button"
                    className={cn(localClasses.Buttons, "last:mb-2 capitalize")}
                    onClick={async () => {
                        try {
                            await signOut(auth);
                            toast.success("Successfully logged out!");
                            push("/login");
                        } catch (error) {}
                    }}>
                    logout
                </button>
            </div>
            {toggle && (
                <div
                    className="overlay fixed top-0 left-0 w-full h-full z-[9]"
                    onClick={() => {
                        setToggle(!toggle);
                    }}></div>
            )}
        </div>
    );
}
