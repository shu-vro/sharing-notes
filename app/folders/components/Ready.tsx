"use client";

import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";
import React, { useState } from "react";

export default function Loading({ children }: { children: React.ReactNode }) {
    const [ready, setReady] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    onAuthStateChanged(auth, user => {
        if (user) {
            setLoggedIn(true);
        }
        setReady(true);
    });
    return ready && loggedIn ? (
        children
    ) : ready && !loggedIn ? (
        <>{children}</>
    ) : (
        "loading..."
    );
}
