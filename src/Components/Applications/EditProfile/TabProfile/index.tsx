import { Col, Nav, NavItem, NavLink } from "reactstrap";
import { Href } from "@/Constant";
import React, { useState } from "react";
import ImagePasswordDetailsTabContent from "./ImagePasswordDetailsTabContent";
import {ToastContainer} from "react-toastify";

const ImageAndPasswordTabs = () => {

  const ImageAndPasswordData: string[] = ["Profile", "Mot de passe"];
  const [activeTab, setActiveTab] = useState(1);

  return (
    <Col sm="12">
      <Nav tabs className="border-tab nav-primary mb-0">
        {ImageAndPasswordData.map((data, index) => (
          <NavItem key={index}>
            <NavLink href={Href} className={activeTab === index + 1 ? "active" : ""} onClick={() => setActiveTab(index + 1)}>
              {data}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <ImagePasswordDetailsTabContent activeTab={activeTab} />
    </Col>
  );
};

export default ImageAndPasswordTabs;
