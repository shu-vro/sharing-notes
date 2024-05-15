"use client";

import File from "./File";

export default function FileSection({
    data,
    prevPath,
}: {
    data: any[];
    prevPath: string;
}) {
    return (
        <div className="flex justify-start flex-wrap gap-6">
            {data.map(file => (
                <File
                    name={file.folderName}
                    key={file.folderName}
                    // file={file}
                    path={file.url}
                />
            ))}
        </div>
    );
}
