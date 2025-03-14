import React, { useState } from "react";
import { Input } from "@heroui/react";

const FileUpload = ({ text = '', required = false, onFileSelect, size = null }) => {

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        onFileSelect(file); // Pass the file to the parent component
    };

    return (
        <div>
            <Input
                isRequired={required}
                type="file"
                id="file-upload"
                variant="bordered"
                size={size || 'lg'}
                radius={size || 'lg'}
                name="file-upload"
                classNames={{ inputWrapper: "bg-white dark:bg-[#18181B] cursor-pointer", input: "cursor-pointer" }}
                onChange={handleFileChange}
                className="block w-[240px] cursor-pointer"
                required />
        </div>
    );
};

export default FileUpload;