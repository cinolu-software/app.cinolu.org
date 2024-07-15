import React, { useState } from 'react';
import { Button, Col, Label, Row } from 'reactstrap';
import {updateCategory, selectCategoryStatus, selectCategoryError} from "@/Redux/Reducers/projectSlice/projectCategorySlice";
import {StaticModalToggleProp, CategoryType} from "@/Types/Projects/category/CategoryType";
import { RootState } from '@/Redux/Store';
import { Flip, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "@/Redux/Store";
import {useAppSelector} from "@/Redux/Hooks";
import {setModalEditCategory} from "@/Redux/Reducers/projectSlice/projectCategorySlice"

interface StaticFormProps extends StaticModalToggleProp {
    staticModalToggle: any;
    selectedCategory: CategoryType ;
}

export const StaticForm: React.FC<StaticFormProps> = ({ staticModalToggle, selectedCategory }) => {

    const dispatch = useDispatch<AppDispatch>();
    const categoryStatus = useSelector(selectCategoryStatus);
    const statusError = useSelector(selectCategoryError);
    const [categoryName, setCategoryName] = useState<string>(selectedCategory?.name);
    const { isOpenModalEditCategory,  } = useAppSelector((state) => state.categories);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        await dispatch(updateCategory({id: selectedCategory?.id, name: categoryName}));
        if (categoryStatus === 'failed') {
            toast.error(
                <p className="text-white tx-16 mb-0">{"Erreur survenue lors de la mise à jour"}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        }
        dispatch(setModalEditCategory({ isOpen: false, category: null }))
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Row className="g-3">
                    <Col md="12">
                        <Label className="mb-2" check>
                            {"Nom du Rôle"}
                        </Label>
                        <input
                            className="form-control mb-4"
                            name="category"
                            type="text"
                            placeholder="Entrer le nom catégorie"
                            value={categoryName}
                            onChange={(e)=>setCategoryName(e.target.value)}
                        />
                    </Col>

                    <Col xs="12">
                        <Button color="primary" type="submit">
                            {"Mettre à jour"}
                        </Button>
                    </Col>
                </Row>
            </form>
        </>
    );
};



