import React, { useState } from "react";
import Checkbox from "./Checkbox";
import Popover, { localClasses } from "./Popover";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { firestoreDb } from "@/firebase";
import { toast } from "sonner";
import Dialog from "./Dialog";
import { isValidFolderId } from "@/lib/utils";

export default function File({
    file,
    path,
    rawPath,
}: {
    file: { [x: string]: any };
    path: string;
    rawPath: string;
}) {
    return (
        <>
            <div
                // htmlFor={path}
                className="primary-border rounded-2xl w-[clamp(150px,4vw,350px)] animate-rise cursor-pointer"
                onDoubleClick={() => {
                    window.open(path, "_blank");
                }}>
                <div className="flex justify-between flex-row p-2 relative">
                    <Checkbox label={file.fileName} path={path} />
                    <Ellipsis path={rawPath} file={file} />
                </div>
                <FileIcon ext={file.fileName.split(".").at(-1)} />
                <div className="text-center break-words">{file.fileName}</div>
            </div>
        </>
    );
}

function FileIcon({ ext }: { ext?: string }) {
    return (
        <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 200 300"
            className="mx-2">
            <g
                strokeLinecap="round"
                transform="translate(10 10) rotate(0 90 140)">
                <path
                    d="M32 0 C57.58 -0.28, 82.48 -1.48, 148 0 M32 0 C59.1 -0.38, 84.87 -1.73, 148 0 M148 0 C170.69 1.33, 179.11 8.94, 180 32 M148 0 C168.99 1.83, 180.35 12.64, 180 32 M180 32 C179.88 84.74, 178.5 136.9, 180 248 M180 32 C181.57 84.25, 182.14 135.49, 180 248 M180 248 C178.43 271.27, 171.02 281.26, 148 280 M180 248 C178.41 270.32, 168.1 280.98, 148 280 M148 280 C113.1 280.22, 77.65 280.81, 32 280 M148 280 C107.56 278.92, 67.61 280.06, 32 280 M32 280 C8.79 279.55, 0.53 268.13, 0 248 M32 280 C10.34 279.28, 1.84 267.49, 0 248 M0 248 C-0.12 170.23, 0.9 94.87, 0 32 M0 248 C-0.44 194.46, -0.11 139.75, 0 32 M0 32 C1.33 9.53, 10.88 -1.6, 32 0 M0 32 C2.07 12.84, 12.85 0.9, 32 0"
                    stroke="var(--primary-color)"
                    strokeWidth="2"
                    fill="none"></path>
            </g>
            <g
                strokeLinecap="round"
                transform="translate(30 110) rotate(0 40 10.370370370370438)">
                <path
                    d="M5.19 0 C30.29 1.15, 48.48 0.45, 74.81 0 C75.64 3.14, 82.37 1.01, 80 5.19 C80.49 7.4, 79.79 10.98, 80 15.56 C82.39 16.43, 76.65 22.91, 74.81 20.74 C52.15 19.81, 29 18.83, 5.19 20.74 C1.62 18.12, 0.59 20.38, 0 15.56 C1.14 11.51, -0.18 7.77, 0 5.19 C-0.44 1.88, 0.98 -3.3, 5.19 0"
                    stroke="none"
                    strokeWidth="0"
                    opacity=".6"
                    fill="#1971c2"></path>
                <path
                    d="M5.19 0 C22.73 -1.29, 38.36 1.59, 74.81 0 M5.19 0 C23.95 1.04, 43.94 -0.22, 74.81 0 M74.81 0 C79.09 -1.67, 78.3 0.55, 80 5.19 M74.81 0 C76.64 -1.44, 80.85 2.05, 80 5.19 M80 5.19 C79.54 8.89, 79.44 12.31, 80 15.56 M80 5.19 C80.18 9.2, 79.73 12.56, 80 15.56 M80 15.56 C78.84 17.11, 77.97 19.71, 74.81 20.74 M80 15.56 C82.27 20, 77.77 18.91, 74.81 20.74 M74.81 20.74 C49.56 19.65, 20.92 21.27, 5.19 20.74 M74.81 20.74 C50.7 21.6, 27.33 20.88, 5.19 20.74 M5.19 20.74 C3.54 21.86, 1.34 19.86, 0 15.56 M5.19 20.74 C2.22 21.61, -1.05 20.91, 0 15.56 M0 15.56 C0.26 12.07, -0.63 9.67, 0 5.19 M0 15.56 C-0.32 12.81, 0.34 10.42, 0 5.19 M0 5.19 C-1.8 1.37, 0.34 0.82, 5.19 0 M0 5.19 C-1.52 1.13, 3.87 -2, 5.19 0"
                    stroke="#1971c2"
                    strokeWidth="2"
                    fill="none"></path>
            </g>
            <g
                strokeLinecap="round"
                transform="translate(30 166.2962962962963) rotate(0 70 10.370370370370324)">
                <path
                    d="M5.19 0 C41.02 -3.18, 84.21 -0.85, 134.81 0 C139.27 -1.57, 139.58 1.35, 140 5.19 C138.57 8.22, 140.64 10.47, 140 15.56 C137.79 18.64, 140.24 18.75, 134.81 20.74 C98.12 19.71, 57.81 21.07, 5.19 20.74 C1.2 24.11, -1.44 19.98, 0 15.56 C-1.83 10.3, 0.51 7.17, 0 5.19 C1.87 0.59, 0.65 1.77, 5.19 0"
                    stroke="none"
                    strokeWidth="0"
                    opacity=".6"
                    fill="#1971c2"></path>
                <path
                    d="M5.19 0 C31.82 1.66, 61.24 1.97, 134.81 0 M5.19 0 C32.68 0.01, 59.92 1.26, 134.81 0 M134.81 0 C138.93 0.03, 140.55 2.06, 140 5.19 M134.81 0 C136.91 -2.13, 138.67 -0.46, 140 5.19 M140 5.19 C140.39 7.91, 139.12 11.87, 140 15.56 M140 5.19 C139.73 7.83, 140.15 11.61, 140 15.56 M140 15.56 C140.26 18.86, 138.06 22.56, 134.81 20.74 M140 15.56 C141.23 19.45, 140.36 22.03, 134.81 20.74 M134.81 20.74 C87.97 20.11, 41.26 21.44, 5.19 20.74 M134.81 20.74 C88.72 20.58, 43.66 20.61, 5.19 20.74 M5.19 20.74 C0.99 22.06, -1.37 18.29, 0 15.56 M5.19 20.74 C3.07 20.7, -2.07 18.6, 0 15.56 M0 15.56 C-0.31 14.13, -0.94 11.1, 0 5.19 M0 15.56 C0.18 11.17, 0.08 7.25, 0 5.19 M0 5.19 C1.74 3.05, 1.33 -1.82, 5.19 0 M0 5.19 C-1.74 1.22, 2.51 0.05, 5.19 0"
                    stroke="#1971c2"
                    strokeWidth="2"
                    fill="none"></path>
            </g>
            <g
                strokeLinecap="round"
                transform="translate(30 207.7777777777776) rotate(0 70 10.370370370370324)">
                <path
                    d="M5.19 0 C45.04 -0.72, 79.94 -0.75, 134.81 0 C140.24 -1.99, 139.43 -1.65, 140 5.19 C138.3 8.49, 139.73 12.9, 140 15.56 C138.56 19.98, 140.93 22.59, 134.81 20.74 C104.27 17.79, 73.27 17.87, 5.19 20.74 C0.65 22.51, 2.15 22.54, 0 15.56 C-0.4 12.36, 1.75 9.77, 0 5.19 C-1.48 4.75, 2.19 0.68, 5.19 0"
                    stroke="none"
                    strokeWidth="0"
                    opacity=".6"
                    fill="#1971c2"></path>
                <path
                    d="M5.19 0 C54.85 0.31, 102.24 -1.87, 134.81 0 M5.19 0 C36.05 1.18, 68.38 -0.03, 134.81 0 M134.81 0 C136.68 1.49, 139.98 1.46, 140 5.19 M134.81 0 C139.2 -1.14, 137.98 2.45, 140 5.19 M140 5.19 C139.9 9.7, 140.57 12.53, 140 15.56 M140 5.19 C140.28 9.35, 140.25 13.05, 140 15.56 M140 15.56 C141.65 19.44, 139.36 21.15, 134.81 20.74 M140 15.56 C140.7 18.67, 136.99 22.45, 134.81 20.74 M134.81 20.74 C101.42 20.87, 71.93 21.56, 5.19 20.74 M134.81 20.74 C108.01 19.18, 80.13 20.77, 5.19 20.74 M5.19 20.74 C-0.01 21.38, 1.64 19.31, 0 15.56 M5.19 20.74 C3 21.59, -1.88 19.42, 0 15.56 M0 15.56 C-0.3 12.26, -0.87 10.62, 0 5.19 M0 15.56 C0.4 12.44, -0.38 8.4, 0 5.19 M0 5.19 C1.21 2.12, 2.29 -0.87, 5.19 0 M0 5.19 C-0.27 1.48, 0.88 -0.87, 5.19 0"
                    stroke="#1971c2"
                    strokeWidth="2"
                    fill="none"></path>
            </g>
            <g
                strokeLinecap="round"
                transform="translate(30 249.25925925925912) rotate(0 60 10.370370370370324)">
                <path
                    d="M5.19 0 C29.35 -1.65, 54.12 -1.52, 114.81 0 C118.43 -0.75, 116.7 2.34, 120 5.19 C120.68 9.52, 121.13 10.07, 120 15.56 C116.66 16.34, 119.43 19.52, 114.81 20.74 C78 22.3, 41.19 22.07, 5.19 20.74 C3.09 21.96, -0.63 19.92, 0 15.56 C1.41 11.68, 0.2 6.11, 0 5.19 C-0.65 4.97, 3.9 3.23, 5.19 0"
                    stroke="none"
                    strokeWidth="0"
                    fill="#1971c2"
                    opacity=".6"></path>
                <path
                    d="M5.19 0 C29.68 0.34, 56.94 2.61, 114.81 0 M5.19 0 C43.51 0.86, 80.21 1.28, 114.81 0 M114.81 0 C117.28 -1.76, 120.63 2.62, 120 5.19 M114.81 0 C118.57 -0.18, 119.75 3.82, 120 5.19 M120 5.19 C120.6 9.55, 120.46 12.74, 120 15.56 M120 5.19 C120.06 8.97, 120.06 12.35, 120 15.56 M120 15.56 C119.7 17.9, 119.76 19.68, 114.81 20.74 M120 15.56 C119.15 20.53, 116.69 19.91, 114.81 20.74 M114.81 20.74 C75.17 18.37, 37.06 18.43, 5.19 20.74 M114.81 20.74 C85.09 20.61, 54.86 20.34, 5.19 20.74 M5.19 20.74 C2.47 19.11, 0.35 17.55, 0 15.56 M5.19 20.74 C3.73 22.26, -0.46 16.92, 0 15.56 M0 15.56 C0.05 13.19, 0.83 11.59, 0 5.19 M0 15.56 C0.15 13.33, -0.18 10.76, 0 5.19 M0 5.19 C-0.21 0.99, 0.97 -0.06, 5.19 0 M0 5.19 C-1.68 2.1, 2.6 -0.22, 5.19 0"
                    stroke="#1971c2"
                    strokeWidth="2"
                    fill="none"></path>
            </g>
            <g transform="translate(30 10) rotate(0 17.316001892089844 22.5)">
                <text
                    x="0"
                    y="51.536"
                    fontSize="30px"
                    fill="#1971c2"
                    textAnchor="start"
                    className="whitespace-pre text-ellipsis"
                    direction="ltr"
                    dominantBaseline="alphabetic">
                    {ext}
                </text>
            </g>
        </svg>
    );
}

function Ellipsis({
    path,
    file,
}: {
    path: string;
    file: { [x: string]: any };
}) {
    const [toggle, setToggle] = useState(false);
    const [fileName, setFileName] = useState(file.fileName);
    const [openRenameDialog, setOpenRenameDialog] = useState(false);
    return (
        <>
            <button
                type="button"
                onClick={e => {
                    e.stopPropagation();
                    setToggle(!toggle);
                }}>
                <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 128 512"
                    width={20}
                    height={20}
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"></path>
                </svg>
            </button>
            <Dialog
                open={openRenameDialog}
                setOpen={setOpenRenameDialog}
                title="Rename File"
                onConfirm={async () => {
                    if (!isValidFolderId(fileName)) {
                        toast.error("Invalid file name!");
                        return;
                    }
                    await deleteDoc(doc(firestoreDb, path));
                    let path_array = path.split("/");
                    path_array[path_array.length - 1] = fileName;
                    await setDoc(
                        doc(firestoreDb, path_array.join("/")),
                        { ...file, fileName },
                        { merge: true }
                    );
                }}>
                <div>
                    <input
                        value={fileName}
                        onChange={e => setFileName(e.target.value)}
                        type="text"
                        id="fileName"
                        className="w-full primary-border p-2 bg-transparent !rounded-lg"
                    />
                </div>
            </Dialog>
            <Popover toggle={toggle} setToggle={setToggle}>
                <button
                    type="button"
                    className={localClasses.Buttons}
                    onClick={() => {
                        setOpenRenameDialog(true);
                    }}>
                    Rename
                </button>
                <button
                    type="button"
                    className={localClasses.Buttons}
                    onClick={async () => {
                        console.log(path);
                        await setDoc(
                            doc(firestoreDb, path),
                            { deleted: true },
                            { merge: true }
                        );
                        toast.success("Successfully deleted!", {
                            action: {
                                label: "Undo",
                                onClick: async () => {
                                    await setDoc(
                                        doc(firestoreDb, path),
                                        { deleted: false },
                                        { merge: true }
                                    );
                                },
                            },
                        });
                    }}>
                    Delete
                </button>
            </Popover>
        </>
    );
}
