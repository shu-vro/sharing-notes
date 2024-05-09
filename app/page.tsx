"use client";

import File from "./components/File";
import Header from "./components/Header";
import AddButtons from "./components/AddButtons";
import FolderSection from "./components/FolderSection";
import { BreadcrumbComponent } from "./components/BreadCrumb";
import Ready from "./components/Ready";
import { useRouter } from "next/navigation";

export default function Home() {
    useRouter().push("/folders");
    return null;
}
