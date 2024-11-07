import React from 'react';
import { Button } from "reactstrap";
import { ProgramsListTypeTableColumnType, ProgramsTypeType } from "@/Types/Programs/ProgramsTypeType";
import RatioImage from "@/CommonComponent/RatioImage";
import { ImagePath } from "@/Constant";
import { useDispatch } from "react-redux";
import {setModalCreateCategory, setModalDeleteCategory, setModalEditCategory} from "@/Redux/Reducers/programsSlice/ProgramsCategory";
import SVG from '@/CommonComponent/SVG';

const ProgramsCategoryListTableName: React.FC<{ image: string; name: string }> = ({ image, name }) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${ImagePath}/${image}`} alt="image" />
            </div>
            <p>{name}</p>
        </div>
    );
};

const ProgramsCategoryListTableAction: React.FC<{ programCategoryType: any }> = ({ programCategoryType }) => {

    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(setModalEditCategory({ isOpen: true, programCategory: programCategoryType }));
    };

    const handleDelete = () => {
        dispatch(setModalDeleteCategory({ isOpen: true, programCategory: programCategoryType }));
    };


    return (
        <div className="product-action">
            <div className={'row w-100 justify-content-center'}>
                <div className={'col-6'}>
                    <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}} onClick={handleEdit}>
                <span>
                  <SVG iconId="editTable"/>
                </span>
                    </button>
                </div>

                <div className={'col-6'}>
                    <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}} onClick={handleDelete} >
                        <SVG iconId="trashTable" />
                    </button>
                </div>
            </div>
        </div>
    )

};

export const ProgramsCategoryListTableDataColumn = [
    {
        name: "Nom",
        cell: (row: ProgramsListTypeTableColumnType) => (
            <ProgramsCategoryListTableName image={row.image ?? "default_program_image.png"} name={row.name || "Unnamed"} />
        ),
        sortable: true,
        grow: 2,
    },
    {
        name: "Action",
        cell: (row: ProgramsListTypeTableColumnType) => <ProgramsCategoryListTableAction programCategoryType={row} />,
        grow: 2
    },
];
