"use client";

import { signInWithGoogle } from "@/firebase";
import React from "react";
import { useRouter } from "next/navigation";

export default function LoginButton() {
    const { push } = useRouter();

    return (
        <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-fit"
            onClick={async () => {
                const user = await signInWithGoogle();
                if (typeof user !== "string") {
                    console.log("User", user);
                    push("/");
                }
            }}>
            Google Login
        </button>
    );
}
