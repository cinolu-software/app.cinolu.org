import StaticBackdropModal from "./StaticBackdropModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";


const CreateCategoryModal = () => {

    const {modalCreateCategory} = useAppSelector((state)=> state.project);
    const dispatch = useAppDispatch();



    return (
        <>
            <StaticBackdropModal/>
        </>
    );
}

export default CreateCategoryModal;