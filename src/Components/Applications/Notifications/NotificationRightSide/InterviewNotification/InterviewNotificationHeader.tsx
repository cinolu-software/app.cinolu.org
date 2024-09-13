import { Tooltip } from "reactstrap";
import { InterviewMail } from "@/Constant";
import { Fragment, useState } from "react";
import { useAppDispatch } from "@/Redux/Hooks";
import { handleInterview} from "@/Redux/Reducers/NotifcationSlice/notificationSlice";
import SVG from '@/CommonComponent/SVG';
import { NotificationHeader  } from "@/Data/Application/Notifications";

const InterviewNotificationHeader = () => {

    const dispatch = useAppDispatch();
    const [openTooltip, setOpenTooltip] = useState<number | null>(null);

    const toggle = (index: number) => {
        setOpenTooltip(openTooltip !== index ? index : null);
    };

    return (
        <div className="mail-header-wrapper header-wrapper1">
            <div className="mail-header1">
                <div className="light-square" onClick={() => dispatch(handleInterview(false))}>
                    <SVG className="btn-email" iconId="back-arrow" />
                </div>
                <span>Envoi de la notification</span>
            </div>
        </div>
    );
}

export default InterviewNotificationHeader