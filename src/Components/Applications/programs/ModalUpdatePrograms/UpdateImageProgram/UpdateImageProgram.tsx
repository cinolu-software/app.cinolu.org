import React, { useState } from "react";
import { Col, Row, Button } from "reactstrap";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { toast, Flip } from "react-toastify";
import { uploadProgramImage } from "@/Redux/Reducers/programsSlice/programsSlice";
import { useAppSelector, useAppDispatch } from "@/Redux/Hooks";


registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UpdateImageProgram: React.FC = () => {

    const [files, setFiles] = useState<any[]>([]);
    const dispatch = useAppDispatch();
    const {selectedProgram} = useAppSelector((state)=> state.programs);



    const handleUpdateProgramImage = async () => {
        if (files.length === 0) {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Veuillez sélectionner une image."}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored"
                }
            );
            return;
        }

        const formData = new FormData();
        formData.append("attachment", files[0].file);

        try {
            await dispatch(uploadProgramImage({ programId: selectedProgram?.id, imageFile: files[0].file }));

            toast.success(
                <p className="text-white tx-16 mb-0">{"Image téléchargée avec succès."}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored"
                }
            );
        } catch (error) {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Échec du téléchargement de l'image."}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored"
                }
            );
        }
    }



    return (
        <>
            <Row>
                <Col className={"col-12"}>
                    <FilePond
                        files={files}
                        allowReorder={true}
                        allowMultiple={false}
                        maxFiles={1}
                        onupdatefiles={setFiles}
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action text-danger text-decoration-none">Browse</span>'
                    />
                </Col>
            </Row>
            <Row>
                <Button color="primary" className="mt-3" onClick={handleUpdateProgramImage}>
                    Attacher une Image au Programme
                </Button>
            </Row>
        </>
    );
};

export default UpdateImageProgram;
