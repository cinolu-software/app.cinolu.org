import { Pagination, PaginationItem, PaginationLink } from "reactstrap";
import { Href } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setPage} from "@/Redux/Reducers/NotifcationSlice/notificationSlice";


const NotificationPagination = () => {

    const {page} = useAppSelector(state => state.notifications);
    const dispatch = useAppDispatch();
    const handlePagination = (value:boolean) => {
        dispatch(setPage(value));
    }

    return (
        <Pagination className="mail-pagination">
            <PaginationItem >
                <PaginationLink href={Href} previous />
            </PaginationItem>
            <PaginationItem active={!page ? true : false} onClick={()=>handlePagination(false)}>
                <PaginationLink href={Href}>1</PaginationLink>
            </PaginationItem>
            <PaginationItem active={page ? true : false} onClick={()=>handlePagination(true)}>
                <PaginationLink href={Href}>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
                <PaginationLink href={Href} next />
            </PaginationItem>
        </Pagination>
    );

}

export default NotificationPagination;