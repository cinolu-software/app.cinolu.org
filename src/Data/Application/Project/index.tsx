import React, {useState} from 'react';
import {ActivityReceive} from "@/Types/ActivitiesTypes";
import RatioImage from "@/CommonComponent/RatioImage";
import {useAppDispatch} from "@/Redux/Hooks";
import { publishProject, setModalDeleteProject} from "@/Redux/Reducers/projectSlice/projectSlice";
import {setSelectedActivity} from "@/Redux/Reducers/ActivitySlice";
import {TableColumn} from "react-data-table-component";
import {useRouter} from "next/navigation";
import {imageBaseUrl} from "@/services/axios";
import {Spinner, Button} from 'reactstrap';
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

const ProjectListTableAction: React.FC<{ project: ActivityReceive; isPublished?: boolean }> = ({ project, isPublished }) => {

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
            <div className="row w-100 justify-content-center g-2">
                {/*<div className="col-6 col-md-3 d-flex justify-content-center">*/}
                {/*    <Button*/}
                {/*        color="info"*/}
                {/*        outline*/}
                {/*        onClick={handleEdit}*/}
                {/*        disabled={loadingEdit}*/}
                {/*        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"*/}
                {/*        style={{*/}
                {/*            padding: '6px 10px',*/}
                {/*            borderRadius: '8px',*/}
                {/*            width: '100%',*/}
                {/*            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        {loadingEdit ? (*/}
                {/*            <Spinner size="sm" className="flex-shrink-0" />*/}
                {/*        ) : (*/}
                {/*            <></>*/}
                {/*            // <SVG iconId="editTable" className="d-none d-md-inline flex-shrink-0" />*/}
                {/*        )}*/}
                {/*        <span className="text-truncate">Modifier</span>*/}
                {/*    </Button>*/}
                {/*</div>*/}
                {/*<div className="col-6 col-md-3 d-flex justify-content-center">*/}
                {/*    <Button*/}
                {/*        color="info"*/}
                {/*        outline*/}
                {/*        onClick={handleDetail}*/}
                {/*        disabled={loadingDetail}*/}
                {/*        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"*/}
                {/*        style={{*/}
                {/*            padding: '6px 10px',*/}
                {/*            borderRadius: '8px',*/}
                {/*            width: '100%',*/}
                {/*            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        {loadingDetail ? (*/}
                {/*            <Spinner size="sm" className="flex-shrink-0" />*/}
                {/*        ) : (*/}
                {/*            <></>*/}
                {/*            // <SVG iconId="moreTable" className="d-none d-md-inline flex-shrink-0" />*/}
                {/*        )}*/}
                {/*        <span className="text-truncate">Détails</span>*/}
                {/*    </Button>*/}
                {/*</div>*/}
                {/*<div className="col-6 col-md-3 d-flex justify-content-center">*/}
                {/*    <Button*/}
                {/*        color={'info'}*/}
                {/*        outline*/}
                {/*        onClick={handlePublish}*/}
                {/*        disabled={loadingPublish}*/}
                {/*        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"*/}
                {/*        style={{*/}
                {/*            padding: '6px 10px',*/}
                {/*            borderRadius: '8px',*/}
                {/*            width: '100%',*/}
                {/*            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        {loadingPublish ? (*/}
                {/*            <Spinner size="sm" className="flex-shrink-0" />*/}
                {/*        ) : (*/}
                {/*            // <SVG iconId={isPublished ? 'unpublish_call' : 'publish_call'} />*/}
                {/*            <></>*/}
                {/*        )}*/}
                {/*        <span className="text-truncate">{isPublished ? 'Dépublier' : 'Publier'}</span>*/}
                {/*    </Button>*/}
                {/*</div>*/}
                {/*<div className="col-6 col-md-3 d-flex justify-content-center">*/}
                {/*    <Button*/}
                {/*        color={'danger'}*/}
                {/*        outline*/}
                {/*        onClick={handleDelete}*/}
                {/*        disabled={loadingDelete}*/}
                {/*        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"*/}
                {/*        style={{*/}
                {/*            padding: '6px 10px',*/}
                {/*            borderRadius: '8px',*/}
                {/*            width: '100%',*/}
                {/*            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        {*/}
                {/*            loadingDelete ?*/}
                {/*                <Spinner size="sm" className="flex-shrink-0"  /> : <></>*/}
                {/*                // <SVG iconId="trashTable" className="d-none d-md-inline flex-shrink-0 txt-danger"/>*/}
                {/*        }*/}
                {/*        <span className="text-truncate">Supprimer</span>*/}
                {/*    </Button>*/}
                {/*</div>*/}
            </div>
        </div>
    );
};

export const ProjectListTableDataColumn: TableColumn<ActivityReceive>[] = [
    // {
    //     name: "Nom",
    //     cell: (row: ActivityReceive) => (
    //         <ProjectListTableName
    //             image={row?.image ? `${imageBaseUrl}/projects/${row.image}` : '/assets/images/programs/programs.png'}
    //             name={row.name}/>
    //     ),
    //     sortable: true,
    //     grow: 2,
    // },
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
    {
        name: "Actions",
        cell: (row: ActivityReceive) => <ProjectListTableAction project={row}/>,
        grow: 2
    },
];
