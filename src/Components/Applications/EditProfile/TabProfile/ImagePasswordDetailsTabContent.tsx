
import { TabContent, TabPane } from "reactstrap";
import React from "react";
import DropzoneContainer from "@/Components/Drop_zone";
import UpdatePassWord from "./UpdatePassWord";

const ImagePasswordDetailsTabContent :React.FC<{ activeTab: any }> = ({ activeTab }) => {

  return (
    <TabContent activeTab={activeTab}>
      <TabPane tabId={1}>
        <DropzoneContainer/>
      </TabPane>
      <TabPane tabId={2}>
        <UpdatePassWord/>
      </TabPane>
    </TabContent>
  );
};

export default ImagePasswordDetailsTabContent;
