import { AddProduct } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFilterToggle } from "@/Redux/Reducers/userSlice/CoachSlice";
import Link from "next/link";
import { Filter } from "react-feather";

export const RoleHeader = () => {
  
  const { filterToggle } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  return (
    <div>
      <Link className="btn btn-primary" href={`/ecommerce/add_product`}>
        <i className="fa fa-plus" />
        Ajouter un rôle
      </Link>
    </div>
  );

};
