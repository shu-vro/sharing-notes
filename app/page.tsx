"use client";

import { useRouter } from "next/navigation";

export default function Home() {
    useRouter().push("/folders");
    return null;
}
