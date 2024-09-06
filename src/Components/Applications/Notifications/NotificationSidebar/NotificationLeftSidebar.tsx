import { Button, Card, CardBody } from 'reactstrap';
import { ComposeEmail} from "@/Constant";
import NotificationNavMenu from './NotificationNavMenu';
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import { setComposeNotification } from "@/Redux/Reducers/NotifcationSlice/notificationSlice";
import { NotificationBoxNavType } from '@/Types/Notifications/NotificationType';


const NotificationLeftSidebar : React.FC<NotificationBoxNavType> = ({ navId, setNavId}) => {

    const { composeNotification } = useAppSelector((state) => state.notifications);
    const dispatch = useAppDispatch();

    return (
        <div className={'email-left-aside'}>
            <Card>
                <CardBody>
                    <div className={'email-app-sidebar'}>
                        <Button color={'primary'} className={'emailbox'} onClick={()=>dispatch(setComposeNotification(!composeNotification))} >
                            <i className={'fa fa-plus'}/> {ComposeEmail}
                        </Button>
                        <NotificationNavMenu navId={navId} setNavId={setNavId} />
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

export default NotificationLeftSidebar;