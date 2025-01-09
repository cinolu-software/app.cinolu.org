import React from 'react';
import ProgramNavTab from "@/Components/Applications/programs/common/DetailProgram/ProgramTabs/TabsHeader/ProgramNavTab";

const TabsHeader: React.FC<{navId: string, setNavId: React.Dispatch<React.SetStateAction<string>>}> = ({navId, setNavId}) => {

    return(
        <div className={'mail-header-wrapper'}>
            <div className={'mail-header'}>
                <div className={'form-check form-check-inline m-0'}>
                    <ProgramNavTab navId={navId} setNavId={setNavId} />
                </div>
            </div>
        </div>
    )
}

export default TabsHeader