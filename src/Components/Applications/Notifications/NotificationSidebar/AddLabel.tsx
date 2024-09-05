import {AddLabelHeading} from "@/Constant";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {NavItem, NavLink} from "reactstrap";
import { setModal } from '@/Redux/Reducers/NotifcationSlice/notificationSlice';


const AddLabel = () => {

    const {modal} = useAppSelector((state) => state.notifications);
    const dispatch = useAppDispatch();

    return (
        <NavItem>
            <NavLink onClick={() => dispatch(setModal(!modal))} className={"border"}>
                <i className={'fa fa-plus'}/>
                {AddLabelHeading}
            </NavLink>
        </NavItem>
    );
};

export default AddLabel;