import { auth, createFile, firestoreDb, storage } from "@/firebase";
import { acceptedExt, isValidFolderId } from "@/lib/utils";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useRefresh } from "../RefreshContext";
import Dialog from "../Dialog";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function AddFile() {
    const params = useParams();
    const { setRefresh } = useRefresh();
    const [openFolderDialog, setOpenFolderDialog] = useState(false);
    const [fileName, setFileName] = useState("");
    const [file, setFile] = useState<File | null>(null);

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
                let url = "";
                if (file) {
                    console.log(file, "inside check");
                    const storageRef = await uploadBytes(
                        ref(
                            storage,
                            `${auth.currentUser.uid}/${(
                                (params.slug as string[]).map(e =>
                                    decodeURIComponent(e)
                                ) || []
                            ).join("/")}/${file.name}`
                        ),
                        // ref(storage, auth.currentUser.uid + "/" + file.name),
                        file
                    );
                    url = await getDownloadURL(storageRef.ref);
                    console.log(url);
                }
                await createFile(fileName, slug.join("/"), url);
            } catch (error) {
                console.log(error);
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
                    <label
                        className="grid place-items-center w-4/5  min-h-[300px] mx-auto primary-border relative mb-6"
                        htmlFor="file-upload">
                        {fileName ? fileName : "Upload files here."}
                        {/* @ts-ignore */}
                        <input
                            type="file"
                            id="file-upload"
                            onDragEnter={e => {
                                const element = e.target as HTMLElement;
                                element.parentElement!.style.borderStyle =
                                    "dashed";
                            }}
                            onDragLeave={e => {
                                const element = e.target as HTMLElement;
                                element.parentElement!.style.borderStyle =
                                    "solid";
                            }}
                            onDrop={e => {
                                const element = e.target as HTMLElement;
                                element.parentElement!.style.borderStyle =
                                    "solid";
                            }}
                            accept={acceptedExt(["pdf", "docx", "doc"])}
                            className="opacity-0 absolute w-full h-full cursor-pointer"
                            onChange={e => {
                                const files = e.target.files as FileList;
                                if (files.length) {
                                    setFileName(files[0].name);
                                }
                                console.log("from function", files[0]);
                                setFile(files[0]);
                            }}
                        />
                    </label>
                    <label className="block text-lg" htmlFor="fileName">
                        Folder Name
                    </label>
                    <input
                        value={fileName}
                        onChange={e => setFileName(e.target.value)}
                        type="text"
                        id="fileName"
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
