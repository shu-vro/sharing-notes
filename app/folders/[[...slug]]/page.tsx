"use client";

import File from "../components/File";
import Header from "../components/Header";
import AddButtons from "../components/AddButtons";
import FolderSection from "../components/FolderSection";
import { BreadcrumbComponent } from "../components/BreadCrumb";
import Ready from "../components/Ready";

import React, { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestoreDb } from "@/firebase";
import { useRefresh } from "../components/RefreshContext";
import FileSection from "../components/FileSection";

export default function Page({ params }: { params: { slug: string[] } }) {
    const [folderData, setFolderData] = useState<any[]>([]);
    const [fileData, setFileData] = useState<any[]>([]);
    params.slug = params.slug || [];
    const { refresh } = useRefresh();

    useEffect(() => {
        // process slug
        let slug = params.slug;
        // if slug is empty, slug becomes ['folders']. if slug is not empty, slug becomes ['folders', slug[0], 'folders', slug[1], ...
        slug = ["folders", ...slug.flatMap(s => [s, "folders"])].map(e =>
            decodeURIComponent(e)
        );

        const fetchFolderData = async () => {
            const q = query(
                collection(firestoreDb, ...(slug as [string, ...string[]])),
                where("type", "==", "folder")
            );
            const querySnapshot = await getDocs(q);
            let res: any[] = [];
            querySnapshot.forEach(doc => {
                res.push(doc.data());
            });
            setFolderData(res);
        };

        fetchFolderData();

        const fetchFileData = async () => {
            if (slug.length > 1) {
                slug.pop();
                slug.push("files");
            }
            const q = query(
                collection(firestoreDb, ...(slug as [string, ...string[]])),
                where("type", "==", "file")
            );
            const querySnapshot = await getDocs(q);
            let res: any[] = [];
            querySnapshot.forEach(doc => {
                res.push(doc.data());
            });
            setFileData(res);
        };

        fetchFileData();
    }, [params.slug, refresh]);

    return (
        <Ready>
            <Header />

            <AddButtons />
            <BreadcrumbComponent
                base="/folders"
                path={
                    // MARK: add shortcut names for each breadcrumb
                    params.slug || []
                }
            />
            <div>
                <h1 className="text-2xl my-7">Folders</h1>
                <FolderSection
                    data={folderData}
                    prevPath={
                        params.slug?.length
                            ? "/" + (params.slug?.join("/") || "")
                            : ""
                    }
                />
                <h1 className="text-2xl my-7">Files</h1>
                <div className="flex justify-start flex-wrap gap-6">
                    <FileSection
                        data={fileData}
                        prevPath={
                            params.slug?.length
                                ? "/" + (params.slug?.join("/") || "")
                                : ""
                        }
                    />
                </div>
            </div>
        </Ready>
    );
}
