import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setFilterToggle } from "@/Redux/Reducers/userSlice/UserSlice";
import { Filter } from "react-feather";
import Link from 'next/link';
import React from "react";

export const AdminListFilterHeader = () => {
  
  const { filterToggle } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const handleFilterToggle = () => {
    dispatch(setFilterToggle());
  }

  return (
    <div>
      <div className="light-box" onClick={handleFilterToggle}>
        <a>
          <Filter className={`filter-icon ${filterToggle ? "hide" : "show"}`} />
          <i className={`icon-close filter-close ${filterToggle ? "show" : "hide"}`} />
        </a>
      </div>
        <Link
            className="btn btn-primary"
            href={'/users/add_user'}
        >
            <i className="fa fa-plus" />
            Créer un utilisateur
        </Link>
    </div>

  );
};
