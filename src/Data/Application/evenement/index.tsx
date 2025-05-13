import React, {useState} from 'react';
import {ActivityReceive} from "@/Types/ActivitiesTypes";
import RatioImage from "@/CommonComponent/RatioImage";
import {useAppDispatch} from "@/Redux/Hooks";
import { publishProject, setSelectedProject, setModalDeleteProject} from "@/Redux/Reducers/projectSlice/projectSlice";
import {setSelectedActivity} from "@/Redux/Reducers/ActivitySlice";
import {TableColumn} from "react-data-table-component";
import {useRouter} from "next/navigation";
import {imageBaseUrl} from "@/services/axios";
import SVG from '@/CommonComponent/SVG';
import {Spinner} from 'reactstrap';
import { Flip, toast } from "react-toastify";

const ProjectListTableName: React.FC<{ image: string, name: string }> = ({image, name}) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${image}`} alt="image"/>
            </div>
            <p>{name}</p>
        </div>
    );
};

const ProjectListTableAction: React.FC<{ project: ActivityReceive }> = ({ project }) => {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingPublish, setLoadingPublish] = useState(false);

    const handleEdit = async () => {
        setLoadingEdit(true);
        router.push('/act/edit');
        dispatch(setSelectedActivity(project));
    };

    const handleDetail = async () => {
        setLoadingDetail(true);
        router.push('/project/detail_project');
        dispatch(setSelectedActivity(project));
    };

    const handleDelete = async () => {
        setLoadingDelete(true);
        //@ts-ignore
        dispatch(setModalDeleteProject({ isOpen: true, project }));
        setLoadingDelete(false);
    };

    const handlePublish = async () => {
        try {
            setLoadingPublish(true);
            setTimeout(() => {
                // @ts-ignore
                    dispatch(publishProject({projectId: project.id}));
                    toast.success("Projet publié avec succès", {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        transition: Flip,
                    });
                    setLoadingPublish(false);
            }
            , 1000);
        }
        catch (e) {
            setLoadingPublish(false);
            toast.error("Une erreur est survenue", {
                autoClose: 5000,
                position: toast.POSITION.TOP_CENTER,
                transition: Flip,
            });
        }
    }


    return (
        <div className="product-action">
            <div className="row w-100 justify-content-center">
                <div className="col-3">
                    <button
                        style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                        onClick={handleEdit}
                        className={'btn-info'}
                        disabled={loadingEdit}
                    >
                        {loadingEdit ? <Spinner size="sm"/> : <SVG iconId="editTable"/>}
                    </button>
                </div>
                <div className="col-3">
                    <button
                        style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                        onClick={handleDetail}
                        className={'btn-info'}
                        disabled={loadingDetail}
                    >
                        {loadingDetail ? <Spinner size="sm"/> : <SVG iconId="moreTable"/>}
                    </button>
                </div>
                <div className="col-3">
                    <button
                        style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                        onClick={handlePublish}
                        className={'btn-info'}
                        disabled={loadingPublish}fill-calendar
                    >
                        {loadingPublish ? <Spinner size="sm"/> : <SVG iconId="published"/>}
                    </button>
                </div>
                <div className="col-3">
                    <button
                        style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                        onClick={handleDelete}
                        className={'btn-info'}
                        disabled={loadingDelete}
                    >
                        {loadingDelete ? <Spinner size="sm"/> : <SVG iconId="trashTable"/>}
                    </button>
                </div>
            </div>
        </div>
    );
};

export const ProjectListTableDataColumn: TableColumn<ActivityReceive>[] = [
    {
        name: "Nom",
        cell: (row: ActivityReceive) => (
            <ProjectListTableName
                image={row?.image ? `${imageBaseUrl}/projects/${row.image}` : '/assets/images/programs/programs.png'}
                name={row.name}/>
        ),
        sortable: true,
        grow: 2,
    },
    {
        name: "Date de début",
        selector: (row: ActivityReceive) => row.started_at,
        sortable: true,
        grow: 1
    },
    {
        name: "Date de fin",
        selector: (row: ActivityReceive) => row.ended_at,
        sortable: true,
        grow: 1
    },
    // {
    //     name: "Nombre de participants",
    //     selector: (row: ActivityReceive) => row.report?.["Nombre total de participants"] ?? 0,
    //     sortable: true,
    //     grow: 1
    // },
    {
        name: "Actions",
        cell: (row: ActivityReceive) => <ProjectListTableAction project={row}/>,
        grow: 2
    },
];