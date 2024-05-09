import Link from "next/link";
import React from "react";
import Menu from "./Menu";

export default function Header() {
    return (
        <div className="w-full p-3 py-2 rounded-2xl primary-border relative flex justify-between">
            <Link
                href="#"
                className="uppercase text-primary no-underline text-4xl font-bold">
                Note Sharing
            </Link>
            <Menu />
        </div>
    );
}
