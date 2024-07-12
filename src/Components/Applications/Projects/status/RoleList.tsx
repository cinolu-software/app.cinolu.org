import {Button} from "reactstrap";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import {setModalCreateRole} from "@/Redux/Reducers/AdminOptions/roleSlice/RoleSlice";



export const RoleHeader = () => {

  const dispatch = useAppDispatch();
  const {isOpenModalCreateRole} = useAppSelector((state) => state.role);


  return (
    <div>
      <Button className="btn btn-primary" onClick={()=>dispatch(setModalCreateRole(!isOpenModalCreateRole))}>
        <i className="fa fa-plus" />
        Ajouter un rôle
      </Button>
    </div>
  );

};
