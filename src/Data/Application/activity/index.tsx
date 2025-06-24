import React, {useState} from 'react';
import { ActivityReceive } from '@/Types/ActivitiesTypes';
import RatioImage from '@/CommonComponent/RatioImage';
import { useAppDispatch } from '@/Redux/Hooks';
import { publishUnpublishActivity, setModalDeleteActivity } from '@/Redux/Reducers/ActivitySlice';
import { setSelectedActivity } from '@/Redux/Reducers/ActivitySlice';
import { TableColumn } from 'react-data-table-component';
import { useRouter } from 'next/navigation';
import { imageBaseUrl } from '@/services/axios';
import { Spinner, Button } from 'reactstrap';


const ActivityListTableName: React.FC<{image: string, name: string}>=({image, name}) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${image}`} alt="image"/>
            </div>
            <p>{name}</p>
        </div>
    )
};

const ActivityListTableAction: React.FC<{ activity: ActivityReceive; showDelete?: boolean}> = ({ activity, showDelete = true }) => {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingPublish, setLoadingPublish] = useState(false);

    const handleEdit = async () => {
        setLoadingEdit(true);
        router.push('/projects/edit');
        dispatch(setSelectedActivity(activity));
    };

    const handleDetail = async () => {
        setLoadingDetail(true);
        router.push('/projects/detail');
        dispatch(setSelectedActivity(activity));
    };

    const handleDelete = async () => {
        setLoadingDelete(true);
        dispatch(setModalDeleteActivity({ isOpen: true, activity }));
        setLoadingDelete(false);
    };

    const handlePublishUnPublish = async () => {
        try {
            setLoadingPublish(true);
            await dispatch(publishUnpublishActivity({activityId: activity.id})).unwrap();
        } catch (error) {
            console.error("Error publishing/unpublishing activity:", error);
        } finally {
            setLoadingPublish(false);
        }
    }


    return (
        <div className="product-action">
            <div className="row w-auto justify-content-center g-2">
                <div className={`col-4 d-flex justify-content-center`}>
                    <Button
                        color="info"
                        outline
                        onClick={handleEdit}
                        disabled={loadingEdit}
                        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                        style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
                    >
                        {loadingEdit ? (
                            <Spinner size="sm" className="flex-shrink-0" />
                        ) : (
                            <></>
                        )}
                        <span className="text-truncate">Modifier</span>
                    </Button>
                </div>
                <div className={`col-4 d-flex justify-content-center`}>
                    <Button
                        color="info"
                        outline
                        onClick={handleDetail}
                        disabled={loadingDetail}
                        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                        style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
                    >
                        {loadingDetail ? (
                            <Spinner size="sm" className="flex-shrink-0" />
                        ) : (
                            <></>
                        )}
                        <span className="text-truncate">Détails</span>
                    </Button>
                </div>
                <div className={`col-4 d-flex justify-content-center`}>
                    {
                        showDelete && (
                            <Button
                                color={'danger'}
                                outline
                                onClick={handleDelete}
                                disabled={loadingDelete}
                                className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                                style={{
                                    padding: '6px 10px',
                                    borderRadius: '8px',
                                    width: '100%',
                                    fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                                }}
                            >
                                {
                                    loadingDelete ?
                                        <Spinner size="sm" className="flex-shrink-0" /> : <></>
                                }
                                <span className="text-truncate">Supprimer</span>
                            </Button>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

const PublishProjectListTableAction: React.FC<{ activity: ActivityReceive; showDelete?: boolean}> = ({ activity, showDelete = true }) => {

    const dispatch = useAppDispatch();
    const router = useRouter();
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [loadingPublish, setLoadingPublish] = useState(false);

    const handleDetail = async () => {
        setLoadingDetail(true);
        router.push('/projects/detail');
        dispatch(setSelectedActivity(activity));
    };

    const handlePublishUnPublish = async () => {
        try {
            setLoadingPublish(true);
            await dispatch(publishUnpublishActivity({activityId: activity.id})).unwrap();
        } catch (error) {
            console.error("Error publishing/unpublishing activity:", error);
        } finally {
            setLoadingPublish(false);
        }
    }

    return (
        <div className="product-action">
            <div className="row w-auto justify-content-center g-2">
                <div className={`col-6 d-flex justify-content-center`}>
                    <Button
                        color="info"
                        outline
                        onClick={handleDetail}
                        disabled={loadingDetail}
                        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                        style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
                    >
                        {loadingDetail ? (
                            <Spinner size="sm" className="flex-shrink-0" />
                        ) : (
                            <></>
                        )}
                        <span className="text-truncate">Détails</span>
                    </Button>
                </div>
                <div className={`col-6 d-flex justify-content-center`}>
                    <Button
                        color={'info'}
                        outline
                        onClick={handlePublishUnPublish}
                        disabled={loadingPublish}
                        className="d-flex align-items-center justify-content-center gap-1 text-nowrap"
                        style={{
                            padding: '6px 10px',
                            borderRadius: '8px',
                            width: '100%',
                            fontSize: 'clamp(0.75rem, 1.5vw, 0.875rem)',
                        }}
                    >
                        {loadingPublish ? (
                            <Spinner size="sm" className="flex-shrink-0" />
                        ) : null}
                        <span className="text-truncate">
                            {activity.is_published ? 'Dépublier' : 'Publier'}
                        </span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export const ActivityListTableDataColumn: TableColumn<ActivityReceive>[] = [
    {
        name: "Nom",
        cell: (row: ActivityReceive) => (
            <ActivityListTableName
                image={row?.cover ? `${imageBaseUrl}/projects/${row.cover}` : '/assets/images/programs/call.jpg'}
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
    {
        name: "Actions",
        cell: (row: ActivityReceive) => (
            <ActivityListTableAction
                activity={row}
                showDelete={true}
            />
        ),
        grow: 2
    },
];

export const ActivityPublishedListTableDataColumn: TableColumn<ActivityReceive>[] = [
    {
        name: "Nom",
        cell: (row: ActivityReceive) => (
            <ActivityListTableName
                image={row?.cover ? `${imageBaseUrl}/projects/${row.cover}` : "/assets/images/programs/call.jpg"}
                name={row.name}
            />
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
    {
        name: "Actions",
        cell: (row: ActivityReceive) => (
            <PublishProjectListTableAction
                activity={row}
                showDelete={false}
            />
        ),
        grow: 2
    },
];