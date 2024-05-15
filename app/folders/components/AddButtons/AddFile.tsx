import { auth, createFile, createFolder, firestoreDb } from "@/firebase";
import { isValidFolderId } from "@/lib/utils";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useRefresh } from "../RefreshContext";
import Dialog from "../Dialog";

export default function AddFile() {
    const params = useParams();
    const { setRefresh } = useRefresh();
    const [openFolderDialog, setOpenFolderDialog] = useState(false);
    const [fileName, setFileName] = useState("");

    const onAddFolderClick = async (folderName: string) => {
        let slug: string[] = (params.slug as string[]) || [];
        slug = ["folders", ...slug.flatMap(s => [s, "folders"])].map(e =>
            decodeURIComponent(e)
        );
        if (slug.length > 1) {
            slug.pop();
        }
        // folder exists
        const querySnapshot = await getDoc(
            doc(firestoreDb, ...(slug as [string, ...string[]]))
        );
        if (querySnapshot.exists()) {
            console.log(querySnapshot.data(), querySnapshot.ref);
            if (!auth.currentUser) {
                return alert("Not logged in");
            }
            if (!isValidFolderId(folderName)) {
                return alert("Invalid folder name");
            }
            if (slug.length > 1) {
                slug.push("files");
            }
            try {
                console.log(slug);
                await createFile(
                    fileName,
                    slug.join("/"),
                    "https://www.google.com"
                );
            } catch (error) {
                return alert(error);
            }

            setRefresh(t => t + 1);
        } else {
            alert("Base Folder not found");
        }
    };
    return (
        <>
            <Dialog
                title="Create File"
                open={openFolderDialog}
                setOpen={setOpenFolderDialog}
                onConfirm={async () => {
                    await onAddFolderClick(fileName);
                }}>
                <div>
                    <label className="block text-lg" htmlFor="folderName">
                        Folder Name
                    </label>
                    <input
                        value={fileName}
                        onChange={e => setFileName(e.target.value)}
                        type="text"
                        id="folderName"
                        className="w-full primary-border p-2 bg-transparent !rounded-lg"
                    />
                </div>
            </Dialog>

            <button
                type="button"
                className="capitalize primary-border p-4"
                onClick={() => {
                    setOpenFolderDialog(true);
                    //  await onAddFolderClick()
                }}>
                <span>+</span>add file
            </button>
        </>
    );
}
