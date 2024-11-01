

export interface UserProfileAppCallBackType {
    callback: (tab: number) => void;
    user: any
}

export interface UserProfileAppTabContentProp {
    activeTab: number;
}

export interface HeaderWithIconPropsTypes {
    setIsOpen: (parameter: boolean) => void;
    isOpen: boolean;
    Heading: string;
}

export interface MyProfileClassCollapseProps {
    isFilter: boolean;
}

export interface PeopleYouMayKnowProps {
    heading: string;
}

export interface MyActivityProps {
    heading: string;
}