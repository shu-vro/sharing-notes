import React from "react";
import { auth, createFolder, firestoreDb } from "@/firebase";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { useRefresh } from "./RefreshContext";

export default function AddButtons() {
    const params = useParams();
    const { setRefresh } = useRefresh();

    const onAddFolderClick = async () => {
        let slug: string[] = (params.slug as string[]) || [];
        slug = ["folders", ...slug.flatMap(s => [s, "folders"])].map(e =>
            decodeURIComponent(e)
        );
        if (slug.length > 1) {
            slug.pop();
        }
        const querySnapshot = await getDoc(
            doc(firestoreDb, ...(slug as [string, ...string[]]))
        );
        if (querySnapshot.exists()) {
            if (!auth.currentUser) {
                return alert("Not logged in");
            }
            if (slug.length > 1) {
                slug.push("folders");
            }
            await createFolder(
                auth.currentUser.uid,
                [],
                slug.join("/"),
                undefined
            );

            // if (slug.length > 1) {
            //     slug.pop();
            // }
            setRefresh(t => t + 1);
        } else {
            alert("Base Folder not found");
        }
    };
    return (
        <div className="flex">
            <div className="grow"></div>
            <div className="my-4">
                <button
                    type="button"
                    className="capitalize primary-border p-4"
                    onClick={async () => await onAddFolderClick()}>
                    <span>+</span>add folder
                </button>
                <button
                    type="button"
                    className="capitalize primary-border p-4 ml-3">
                    <span>+</span> add files
                </button>
            </div>
        </div>
    );
}
