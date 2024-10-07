export interface InitialStateType {
    modal: boolean;
    composeNotification: boolean;
    faIcon: boolean;
    interviewNotification: boolean;
    page?: boolean;
    inboxNotification: InboxNotificationType[];
    notificationValidation: boolean;
    selectedUser: null;
}

export interface InboxNotificationType {
    color: string;
    id: number;
    image?: string;
    shortName?: string;
    name: string;
    message: string;
    subMessage: string;
    badge?: BadgeType[];
    time: string;
    star?: boolean;
}

interface BadgeType {
    title: string;
    color: string;
}

export interface AddNewNotificationInterface {
    userNotification: string;
    subject: string;
}

export interface NotificationSubInputType {
    ccShow: boolean;
    bccShow: boolean;
}

export interface CommonDataType {
    data: InboxNotificationType;
    ids: number;
}

export interface NotificationBoxNavType {
    navId: string;
    setNavId: (key: string) => void;
}

export interface NotificationBoxNavContentType {
    navId: string;
}

export interface NotificationPropsType{
    handlerPrintData: () => void,
}

