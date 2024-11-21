import { Badge, Nav, NavItem, NavLink } from "reactstrap";
import React from "react";
import { useAppSelector } from "@/Redux/Hooks";
import { PhaseNavMenuProps } from "@/Types/Programs/PhasesType";

const PhaseNavMenu: React.FC<PhaseNavMenuProps> = ({ navId, setNavId }) => {
    const { programData } = useAppSelector(state => state.programs);

    const phases = programData?.phases || [];


    const getPhaseStatus = (startDate: string, endDate: string): { status: string, color: string } => {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);

        if (now < start) {
            return { status: "À venir", color: "primary" };
        } else if (now >= start && now <= end) {
            return { status: "En cours", color: "warning" };
        } else {
            return { status: "Terminée", color: "success" };
        }
    };


    const truncateText = (text: string, maxLength: number): string => {
        return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
    };

    return (
        <Nav pills tabs className="main-menu email-category border-0">
            {phases.length > 0 ? (
                phases.map((phase: any, index: number) => {
                    const { status, color } = getPhaseStatus(phase.started_at, phase.ended_at);
                    return (
                        <NavItem key={index}>
                            <NavLink
                                className={navId === phase.id ? "active" : ""}
                                onClick={() => setNavId(phase.id)}
                            >
                                <div>
                                    {truncateText(phase.name, 15)}
                                </div>
                                <Badge color={color} pill className="ms-2">
                                    {status}
                                </Badge>
                            </NavLink>
                        </NavItem>
                    );
                })
            ) : (
                <div className="text-muted">Aucune phase disponible</div>
            )}
        </Nav>
    );
};

export default PhaseNavMenu;


