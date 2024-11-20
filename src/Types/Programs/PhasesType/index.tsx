export interface Props {
    navId: string;
    setNavId: (id: string) => void;
}

export interface PhaseNavMenuProps extends Props {}
export interface PhaseSideBarProps extends Props {}
export interface PhaseLeftSidebarProps extends Props {}

export interface PhaseRightSideProps {
    navId: string;
}
