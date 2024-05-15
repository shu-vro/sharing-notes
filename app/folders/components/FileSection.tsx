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
                    name={file.fileName}
                    key={file.fileName}
                    // file={file}
                    path={file.url}
                />
            ))}
        </div>
    );
}
