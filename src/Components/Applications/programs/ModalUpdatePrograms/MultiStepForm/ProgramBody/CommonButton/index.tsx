import SVG from "@/CommonComponent/SVG";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { setNavId, setTabId } from "@/Redux/Reducers/programsSlice/programsSlice";
import { Button } from "reactstrap";

const CommonButton = () => {
    const { navId, formValue, tabId } = useAppSelector((state) => state.programs);
    const dispatch = useAppDispatch();

    const handleFormValue = () => {
        if (navId === 1 && formValue?.name !== "" && formValue?.description) {
            dispatch(setNavId(2));
        } else if (navId === 2 && formValue?.start_at !== "" && formValue?.end_at) {
            dispatch(setNavId(3));
        } else if (navId === 3 && formValue?.type !== null) {
            dispatch(setNavId(4));
        }
    };

    const handlePrevious = () => {
        if (navId > 1) {
            if (tabId > 1) {
                dispatch(setTabId(tabId - 1));
            } else {
                dispatch(setNavId(navId - 1));
            }
        }
    };

    return (
        <div className="product-buttons border-0">
            {navId > 1 && (
                <Button color="transparent" onClick={handlePrevious}>
                    <div className="d-flex align-items-center gap-sm-2 gap-1">
                        <SVG iconId="back-arrow" />{"Précedent"}
                    </div>
                </Button>
            )}
            <Button color="transparent" className="ms-2" onClick={handleFormValue}>
                <div className="d-flex align-items-center gap-sm-2 gap-1">
                    {navId === 3 ? "Submit" : "Suivant"}
                    <SVG iconId="front-arrow" />
                </div>
            </Button>
        </div>
    );
};

export default CommonButton;

