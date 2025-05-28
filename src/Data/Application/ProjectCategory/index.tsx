import React from 'react';
import {ProjectListTypeTableColumnType} from "@/Types/Projects/ProjectTypeType";
import RatioImage from "@/CommonComponent/RatioImage";
import { ImagePath } from "@/Constant";
import { useDispatch } from "react-redux";
import {setModalCreateCategory, setModalDeleteCategory, setModalEditCategory} from "@/Redux/Reducers/projectSlice/ProjectCategory";
import SVG from '@/CommonComponent/SVG';
import {Button} from "reactstrap";

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
                    <Button
                        color="primary"
                        outline
                        onClick={handleEdit}
                        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                        style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
                    >
                        {
                            <SVG iconId="editTable" className="d-none d-md-inline flex-shrink-0" />
                        }
                        <span className="text-truncate">Modifier</span>
                    </Button>
                </div>

                <div className={'col-6'}>
                    <Button
                        color="danger"
                        outline
                        onClick={handleDelete}
                        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                        style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
                    >
                        {
                            <SVG iconId="trashTable" className="d-none d-md-inline flex-shrink-0" />
                        }
                        <span className="text-truncate">Supprimer</span>
                    </Button>
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
