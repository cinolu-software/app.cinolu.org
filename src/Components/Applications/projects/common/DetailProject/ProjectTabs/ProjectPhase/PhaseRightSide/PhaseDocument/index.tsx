import { TabPane} from "reactstrap";
import React from "react";

const PhaseDocument: React.FC<{navId: string}> = ({navId}) => {

    return (
        <TabPane tabId="document-tab">
            <div className="p-3 my-5 bg-white">
                <h5 className="text-success">Document de la phase</h5>

            </div>
        </TabPane>
    )

}

export default PhaseDocument;