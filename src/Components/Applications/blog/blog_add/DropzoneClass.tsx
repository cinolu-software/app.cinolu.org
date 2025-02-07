import { BlogDropFilesHereOrClickToUpload } from "@/Constant";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { useState, useEffect } from "react";
import { Form } from "reactstrap";

const DropzoneClass = ({ onFilesChange }: { onFilesChange: (file: File | null) => void }) => {

    const [files, setFiles] = useState<ExtFile[]>([]);

    const updateFiles = (incomingFiles: ExtFile[]) => {
        setFiles(incomingFiles);
        if (incomingFiles.length > 0 && incomingFiles[0].file) {
            onFilesChange(incomingFiles[0].file);
        } else {
            onFilesChange(null);
        }
    };

    const removeFile = (id: string | number | undefined) => {
        const newFiles = files.filter((x: ExtFile) => x.id !== id);
        setFiles(newFiles);
        onFilesChange(newFiles[0]?.file || null);
    };

    return (
        <Form className="m-b-20">
            <Dropzone
                onChange={updateFiles}
                value={files}
                maxFiles={1}
                header={false}
                footer={false}
                label="Glissez-déposez une image ici ou cliquez pour parcourir"
            >
                {files.map((file: ExtFile) => (
                    <FileMosaic
                        key={file.id}
                        {...file}
                        onDelete={removeFile}
                        info={true}
                    />
                ))}
                {files.length === 0 && (
                    <div className="dz-message needsclick">
                        <i className="icon-cloud-up fs-1 txt-primary"></i>
                        <h6 className="f-w-700 mb-1">{BlogDropFilesHereOrClickToUpload}</h6>
                    </div>
                )}
            </Dropzone>
        </Form>
    );
};

export default DropzoneClass;