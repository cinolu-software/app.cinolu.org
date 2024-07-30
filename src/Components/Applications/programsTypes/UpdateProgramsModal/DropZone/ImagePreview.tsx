import React, { useState } from "react";
import { Card, CardBody, Col } from "reactstrap";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { useDispatch, useSelector } from "react-redux";
import { uploadProgramImage, selectProgramStatus, selectProgramError } from "@/Redux/Reducers/programsSlice/programsSlice";
import { RootState } from "@/Redux/Store";
import {ImagePath} from "@/Constant";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ImagePreview: React.FC = () => {
    const dispatch = useDispatch();
    const programStatus = useSelector((state: RootState) => state.programs.status);
    const programError = useSelector((state: RootState) => state.programs.error);
    const selectedProgram = useSelector((state: RootState) => state.programs.selectedProgram);

    const [files, setFiles] = useState<any[]>([]);

    const handleImageUpload = async () => {
        if (files.length > 0 && selectedProgram) {
            const imageFile = files[0].file;
            await dispatch(uploadProgramImage({ programId: selectedProgram.id, imageFile }));
            if (programStatus === 'failed') {
                console.error('Error uploading image:', programError);
            }
        }
    };

    console.log(selectedProgram);

    return (
        <Col>
            <div className="set-col-12 box-col-12 p-4">
                <Card>
                    <div className="blog-box blog-shadow">
                        <img className="img-fluid" src={selectedProgram?.image && `${ImagePath}/blog/blog.jpg`} alt="blog image" />
                    </div>
                </Card>
            </div>
            <Card>
                <CardBody>
                    <FilePond
                        files={files}
                        allowReorder={true}
                        allowMultiple={false}
                        maxFiles={1}
                        onupdatefiles={setFiles}
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action text-danger text-decoration-none">Browse</span>'
                    />
                    <button onClick={handleImageUpload} className="btn btn-primary mt-3">
                        Mise à jour
                    </button>
                </CardBody>
            </Card>
        </Col>
    );
};

export default ImagePreview;
