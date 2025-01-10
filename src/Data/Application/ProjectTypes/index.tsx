import React from 'react';
import { ProjectListTypeTableColumnType, ProjectTypeType } from "@/Types/Projects/ProjectTypeType";
import RatioImage from "@/CommonComponent/RatioImage";
import { ImagePath } from "@/Constant";
import { useDispatch } from "react-redux";
import { setModalDeleteProjectTypes, setModalEditProjectTypes } from "@/Redux/Reducers/projectSlice/projectTypeSlice";
import SVG from '@/CommonComponent/SVG';


const ProjectListTableName: React.FC<{ image: string; name: string }> = ({ image, name }) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${ImagePath}/${image}`} alt="image" />
            </div>
            <p>{name}</p>
        </div>
    );
};

const ProjectListTableAction: React.FC<{ projectType: ProjectTypeType }> = ({ projectType }) => {

    const dispatch = useDispatch();

    const handleEdit = () => {
        dispatch(setModalEditProjectTypes({ isOpen: true, projectType }));
    };

    const handleDelete = () => {
        dispatch(setModalDeleteProjectTypes({ isOpen: true, projectType }));
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

export const ProjectTypeListTableDataColumn = [
    {
        name: "Nom",
        cell: (row: ProjectListTypeTableColumnType) => (
            <ProjectListTableName image={row.image ?? "default_program_image.png"} name={row.name || "Unnamed"} />
        ),
        sortable: true,
        grow: 3,
    },
    {
        name: "Action",
        cell: (row: ProjectListTypeTableColumnType) => <ProjectListTableAction projectType={row} />,
        grow: 1
    },
];
