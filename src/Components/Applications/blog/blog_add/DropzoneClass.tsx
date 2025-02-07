import { BlogDropFilesHereOrClickToUpload } from "@/Constant";
import { Dropzone, ExtFile, FileMosaic } from "@dropzone-ui/react";
import { useState } from "react";
import { Form } from "reactstrap";

const DropzoneClass = () => {
    const [files, setFiles] = useState<ExtFile[]>([]);
    const updateFiles = (incomingFiles: ExtFile[]) => {
        setFiles(incomingFiles);
    };
    const removeFile = (id: string | number | undefined) => {
        setFiles(files.filter((x: ExtFile) => x.id !== id));
    };

    return (
        <Form className="m-b-20">
            <Dropzone onChange={updateFiles} value={files} maxFiles={1} header={false} footer={false} label="Glissez-déposez une image ici ou cliquez pour parcourir">
                {files.map((file: ExtFile) => (
                    <FileMosaic key={file.id} {...file} onDelete={removeFile} info={true} />
                ))}
                {files.length === 0 && (
                    <div className="dz-message needsclick">
                        <i className="icon-cloud-up fs-1 txt-primary"></i>
                        <h6 className="f-w-700 mb-1">Déposez une image ici ou cliquez pour l'ajouter.</h6>
                    </div>
                )}
            </Dropzone>
        </Form>

    );
};

export default DropzoneClass;