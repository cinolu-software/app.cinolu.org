export interface CommonModalType {
    backdrop?: boolean | "static";
    centered?: boolean;
    size?: "sm" | "lg" | "xl" | "xxl";
    isOpen: boolean;
    toggle: () => void;
    title?: string;
    onClosed?: () => void;
    sizeTitle?: string;
    fullTitle?: string;
    modalBodyClassName?: string;
    children: React.ReactNode;
}