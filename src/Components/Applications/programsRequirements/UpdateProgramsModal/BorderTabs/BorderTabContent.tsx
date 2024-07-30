import React from 'react';
import { TabContent, TabPane } from 'reactstrap';
import { StaticForm } from '../StaticBackdropModal/StaticForm';
import ImagePreview from '../DropZone/ImagePreview';
import { useAppDispatch, useAppSelector } from '@/Redux/Hooks';
import { setModalEditProgram } from '@/Redux/Reducers/programsSlice/programsSlice';

export const BorderTabContent: React.FC<{ basicTab: string }> = ({ basicTab }) => {
    const { selectedProgram, transformedProgramsData } = useAppSelector((state) => state.programs);
    const dispatch = useAppDispatch();

    const selectedProgramData = transformedProgramsData.find((item) => item.id === selectedProgram?.id);

    return (
        <TabContent activeTab={basicTab}>
            <TabPane tabId="1">
                <StaticForm
                    staticModalToggle={() => dispatch(setModalEditProgram({ isOpen: false, program: null }))}
                    selectedProgram={selectedProgramData}
                />
            </TabPane>
            <TabPane tabId="2">
                <ImagePreview />
            </TabPane>
        </TabContent>
    );
};
