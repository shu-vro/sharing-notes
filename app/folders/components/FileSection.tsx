"use client";

import File from "./File";

export default function FileSection({
    data,
    prevPath,
}: {
    data: any[];
    prevPath: string[];
}) {
    let rawPath = ["folders", ...prevPath.flatMap(s => [s, "folders"])].map(e =>
        decodeURIComponent(e)
    );

    rawPath[rawPath.length - 1] = "files";
    return (
        <div className="flex justify-start flex-wrap gap-6">
            {data.map(file => (
                <File
                    file={file}
                    key={file.fileName}
                    // file={file}
                    path={file.url}
                    rawPath={rawPath.join("/") + "/" + file.fileName}
                />
            ))}
        </div>
    );
}
