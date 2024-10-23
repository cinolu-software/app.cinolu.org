import React, {useState} from 'react';
import {useAppSelector, useAppDispatch} from "@/Redux/Hooks";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { toast, Flip } from "react-toastify";
import {updateAttachmentProgramImage} from "@/Redux/Reducers/programsSlice/programsSlice";

const ImagePreview = () => {
    const dispatch = useAppDispatch();
    const [files, setFiles] = useState([]);

    const handleUpdateImage = () => {
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
            )
            return;
        }
        const formData = new FormData()
        formData.append('thumb', files[0]?.file)
        dispatch(updateAttachmentProgramImage(formData)).unwrap()
            .then(
                () => {
                    toast.success(
                        <p className="text-white tx-16 mb-0">{'Ajout de l\'image de couverture effectué avec succès'}</p>,
                        {
                            autoClose: 5000,
                            position: toast.POSITION.TOP_CENTER,
                            hideProgressBar: false,
                            transition: Flip,
                            theme: "colored",
                        }
                    )
                },
                (err) => {
                    toast.error(
                        <p className="text-white tx-16 mb-0">{"Erreur survenue lors de l'ajout de l'image de couverture"}</p>,
                        {
                            autoClose: 5000,
                            position: toast.POSITION.TOP_CENTER,
                            hideProgressBar: false,
                            transition: Flip,
                            theme: "colored",
                        }
                    )
                }
            )
    }
}

export default ImagePreview;