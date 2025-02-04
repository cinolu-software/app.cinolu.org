import React from 'react';
import UploadDocument from "@/Components/Applications/projects/common/DetailProject/ProjectTabs/ProjectPhase/PhaseRightSide/PhaseDocument/stepDocument/DocumentTabContent/UploadDocument";
import {useAppDispatch} from "@/Redux/Hooks";
import {addAttachmentDocumentFile} from "@/Redux/Reducers/projectSlice/ProjectDocumentSlice";

const StepTwo = () => {

    const dispatch = useAppDispatch();

    return (
        <div className={'mt-5'}>
            <UploadDocument/>
        </div>
    )
}

export default StepTwo