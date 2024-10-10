import React from 'react';
import SVG from "@/CommonComponent/SVG";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { Button } from "reactstrap";
import { setNavId } from "@/Redux/Reducers/NotifcationSlice/notificationSlice";

const CommonButton = () => {

    const { navId, formValue } = useAppSelector((state) => state.notifications);
    const dispatch = useAppDispatch();


    // const handleFormValue = () => {
    //     if (navId === 1 && formValue.title && formValue.message) {
    //         dispatch(setNavId(2));
    //     } else if (navId === 2 && formValue.fileName1) {
    //         dispatch(setNavId(3));
    //     }
    // };


    // const handlePrevious = () => {
    //     if (navId > 1) {
    //         dispatch(setNavId(navId - 1));
    //     }
    // };

    return (
        <div className="product-buttons border-0">

            {/*{navId > 1 && (*/}
            {/*    <Button color="transparent" onClick={handlePrevious}>*/}
            {/*        <div className="d-flex align-items-center gap-sm-2 gap-1">*/}
            {/*            <SVG iconId="back-arrow" />*/}
            {/*            {"Précedent"}*/}
            {/*        </div>*/}
            {/*    </Button>*/}
            {/*)}*/}

            <Button color="primary" className="" >
                <div className="d-flex align-items-center gap-sm-2 gap-1">
                    {"Envoyer la notification"}
                    <SVG iconId="send-icon" />
                </div>
            </Button>

        </div>
    );
};

export default CommonButton;
