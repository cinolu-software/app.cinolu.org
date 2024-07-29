import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import React, { useEffect } from "react";
import { Container } from "reactstrap";
import { fetchProductApiData } from "@/Redux/Reducers/ProductSlice";
import UsersGrid from "@/Components/Applications/Users/UsersGrid";
import UsersFeatures from "@/Components/Applications/Users/UsersFeatures";

const UsersContainer = () => {

  const { sideBarOn } = useAppSelector((state) => state.filterData);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(fetchProductApiData())
  },[])

  return (

    <Container fluid className={`product-wrapper ${sideBarOn ? "sidebaron" : ""}`}>
      <div className="product-grid">
        <UsersFeatures />
        <UsersGrid />
      </div>
    </Container>

  );
};

export default UsersContainer;
