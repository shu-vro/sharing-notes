"use client";

import React, { useState } from "react";
import { auth } from "@/firebase";
import { cn } from "@/lib/utils";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import LoginButton from "../../login/components/LoginButton";
import { toast } from "sonner";
import Link from "next/link";
import Popover, { localClasses } from "./Popover";

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
            <Popover toggle={toggle} setToggle={setToggle}>
                <div className="primary-border mb-4 rounded-2xl p-3">
                    {auth.currentUser?.displayName}
                </div>
                <Link
                    href={`/folders/${
                        auth.currentUser ? auth.currentUser.email : ""
                    }`}
                    className={cn(localClasses.Buttons)}>
                    My Notes
                </Link>
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
            </Popover>
        </div>
    );
}
