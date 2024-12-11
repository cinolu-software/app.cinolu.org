import React from "react";
import { CardHeader } from "reactstrap";
import { useAppSelector } from "@/Redux/Hooks";
import { ImagePath } from "@/Constant";

const ProfileHeader = () => {
    const { user } = useAppSelector((state) => state.auth);

    return (
        <CardHeader>
            <div className="row profile-header">
                <div className="col-12 bg-light-primary block-backgroud"></div>
                <div className="avatar-profile">
                    <img
                        src={`${ImagePath}/avtar/avatar_.jpg`}
                        alt="Profile"
                        onError={(e) =>
                            (e.currentTarget.src = `${ImagePath}/default-avatar.jpg`)
                        }
                    />
                </div>
                <div className="col-12 block-info">
                    <h1>{user?.name || "Utilisateur Inconnu"}</h1>
                    <h4>{user?.email || "Email non disponible"} · Rejoint le 8 juillet 2024</h4>
                </div>
            </div>
        </CardHeader>
    );
};

export default ProfileHeader;

