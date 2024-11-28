import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CardBody, Col, Button, Spinner } from "reactstrap";
import { FilePond, registerPlugin } from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { AppDispatch } from "@/Redux/Store";
import { updateProfileImage } from "@/Redux/Reducers/AuthSlice";
import { toast, Flip } from "react-toastify";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const ImagePreview = () => {

    const dispatch = useDispatch<AppDispatch>();
    const [files, setFiles] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const handleUpdateProfileImage = () => {

        setLoading(true);
        if (files.length === 0) {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Veuillez sélectionner une image."}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
            return;
        }

        const formData = new FormData();
        formData.append("thumb", files[0].file);

        setTimeout(()=>{

            dispatch(updateProfileImage(formData))
                .unwrap()
                .then(() => {
                    toast.success(
                        <p className="text-white tx-16 mb-0">{"Mise à jour de l'image de profil effectuée avec succès"}</p>,
                        {
                            autoClose: 5000,
                            position: toast.POSITION.TOP_CENTER,
                            hideProgressBar: false,
                            transition: Flip,
                            theme: "colored",
                        }
                    );
                })
                .catch((error) => {
                    toast.error(
                        <p className="text-white tx-16 mb-0">{error}</p>,
                        {
                            autoClose: 5000,
                            position: toast.POSITION.TOP_CENTER,
                            hideProgressBar: false,
                            transition: Flip,
                            theme: "colored",
                        }
                    );
                });

            setLoading(false);

        }, 1000)

    };

    return (
        <Col lg="12">
            <CardBody>
                <FilePond
                    files={files}
                    allowReorder={true}
                    allowMultiple={false}
                    maxFiles={1}
                    onupdatefiles={setFiles}
                    labelIdle=' <span class="filepond--label-action text-danger text-decoration-none">Deposez le fichier ici</span>'
                />
                <button
                    className={'btn btn-outline-primary'}
                    onClick={handleUpdateProfileImage}
                    disabled={loading}

                >
                    Mettre à jour l'image de profil
                    <span className={'ms-2'}>
                        {loading ? <Spinner size={'sm'}/> : ""}
                    </span>
                </button>
            </CardBody>
        </Col>
    );
};

export default ImagePreview;
