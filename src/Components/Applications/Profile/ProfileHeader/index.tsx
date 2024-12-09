import React, { useRef } from "react";
import { CardHeader } from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { ImagePath } from "@/Constant";

import {updateProfileImage} from "@/Redux/Reducers/AuthSlice";

const ProfileHeader = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // Formater la date d'inscription
    const formatDate = (dateString: string) => {
        if (!dateString) return "Date inconnue";
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
        }).format(date);
    };

    const inscriptionDate = user?.created_at ? formatDate(user.created_at) : "Date inconnue";


    const handleCameraClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };


    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const formData = new FormData();
            formData.append("image", event.target.files[0]);
            dispatch(updateProfileImage(formData));
        }
    };

    return (
        <CardHeader>
            <div className="row profile-header">
                <div className="col-12 bg-light-primary block-backgroud"></div>
                <div className="avatar-profile">
                    <img
                        src={`${ImagePath}/avtar/avatar_.jpg`}
                        alt="Profile"
                        onError={(e) => (e.currentTarget.src = `${ImagePath}/default-avatar.jpg`)}
                    />
                    <button
                        className="camera-button"
                        onClick={handleCameraClick}
                        title="Changer l'image de profil"
                    >
                        <img src={`${ImagePath}/other/camera.png`} alt="Changer l'image"/>
                    </button>
                </div>
                <div className="col-12 block-info">
                    <h1>{user?.name || "Utilisateur Inconnu"}</h1>
                    <h4>
                        {user?.email || "Email non disponible"} · Rejoint le {inscriptionDate}
                    </h4>
                </div>
            </div>
        </CardHeader>
    );
};

export default ProfileHeader;



