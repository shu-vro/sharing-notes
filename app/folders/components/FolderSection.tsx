"use client";

import Folder from "./Folder";

export default function FolderSection({
    data,
    prevPath,
}: {
    data: any[];
    prevPath: string;
}) {
    return (
        <div className="flex justify-start flex-wrap gap-6">
            {data.map(folder => (
                <Folder
                    name={folder.folderName}
                    key={folder.folderName}
                    folder={folder}
                    path={prevPath + "/" + folder.folderName}
                />
            ))}
        </div>
    );
}
