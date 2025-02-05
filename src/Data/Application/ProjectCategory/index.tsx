import React from 'react';
import {ProjectListTypeTableColumnType} from "@/Types/Projects/ProjectTypeType";
import RatioImage from "@/CommonComponent/RatioImage";
import { ImagePath } from "@/Constant";
import { useDispatch } from "react-redux";
import {setModalCreateCategory, setModalDeleteCategory, setModalEditCategory} from "@/Redux/Reducers/projectSlice/ProjectCategory";
import SVG from '@/CommonComponent/SVG';

const ProjectCategoryListTableName: React.FC<{ image: string; name: string }> = ({ image, name }) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${ImagePath}/${image}`} alt="image" />
            </div>
            <p>{name}</p>
        </div>
    );
};

const ProjectCategoryListTableAction: React.FC<{ projectCategoryType: any }> = ({ projectCategoryType }) => {

    const dispatch = useDispatch();
    const handleEdit = () => {
        dispatch(setModalEditCategory({ isOpen: true, projectCategory: projectCategoryType }));
    };
    const handleDelete = () => {
        dispatch(setModalDeleteCategory({ isOpen: true, projectCategory: projectCategoryType }));
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

export const ProjectCategoryListTableDataColumn = [
    {
        name: "Nom",
        cell: (row: ProjectListTypeTableColumnType) => (
            <ProjectCategoryListTableName image={'programs/programs.png'} name={row.name || "Unnamed"} />
        ),
        sortable: true,
        grow: 3,
    },
    {
        name: "Action",
        cell: (row: ProjectListTypeTableColumnType) => <ProjectCategoryListTableAction projectCategoryType={row} />,
        grow: 1
    },
];
