import { Card } from 'reactstrap';
import {useRef} from "react";
import { useReactToPrint } from "react-to-print";
import {useAppSelector} from "@/Redux/Hooks";
import InterviewNotificationHeader from "./InterviewNotificationHeader";
import InterviewNotificationBody from "./InterviewNotificationBody";

const InterviewNotification = () => {
    
    const { interviewNotification } = useAppSelector(state => state.notifications)
    const componentRef = useRef<HTMLDivElement | null>(null);

    const handlePrintData = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <Card className={`email-body email-read ${interviewNotification ? "show" : "hide"}`}>
            <InterviewNotificationHeader />
            <InterviewNotificationBody ref={componentRef} handlerPrintData={handlePrintData} />
        </Card>
    )
}

export default InterviewNotification