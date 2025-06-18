import React, {useState} from 'react';
import RatioImage from "@/CommonComponent/RatioImage";
import {useAppDispatch} from "@/Redux/Hooks";
import {setSelectedEvenement} from "@/Redux/Reducers/evenement";
import {TableColumn} from "react-data-table-component";
import {useRouter} from "next/navigation";
import {imageBaseUrl} from "@/services/axios";
import {publishUnpublishEvenement} from "@/Redux/Reducers/evenement";
import {Spinner, Button} from 'reactstrap';
import { Flip, toast } from "react-toastify";
import {EvenementType} from "@/Types/evenement";
import {setModalDeleteEvenement} from "@/Redux/Reducers/evenement";


const EvenementListTableName: React.FC<{ image: string, name: string }> = ({image, name}) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${image}`} alt="image"/>
            </div>
            <p>{name}</p>
        </div>
    );
};

const EvenementListTableAction: React.FC<{ event: EvenementType ; showDelete?:boolean }> = ({ event, showDelete = true }) => {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingPublish, setLoadingPublish] = useState(false);

    const handleEdit = async () => {
        setLoadingEdit(true);
        router.push('/evenement/edit');
        dispatch(setSelectedEvenement(event));
    };

    const handleDetail = async () => {
        setLoadingDetail(true);
        router.push('/evenement/detail');
        dispatch(setSelectedEvenement(event));
    };

    const handleDelete = async () => {
        setLoadingDelete(true);
        dispatch(setModalDeleteEvenement({isOpen: true, evenement: event}));
        setLoadingDelete(false);
    };

    const handlePublish = async () => {
        try {
            setLoadingPublish(true);
            setTimeout(() => {
                    dispatch(publishUnpublishEvenement({ evenementId: event.id }));
                    toast.success("Evénement publié avec succès", {
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
                <div className={showDelete ? `col-6 col-md-3 d-flex justify-content-center` : 'col-6 col-md-4 d-flex justify-content-center'}>
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
                <div className={showDelete ? `col-6 col-md-3 d-flex justify-content-center` : 'col-6 col-md-4 d-flex justify-content-center'}>
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
                <div className={showDelete ? `col-6 col-md-3 d-flex justify-content-center` : 'col-6 col-md-4 d-flex justify-content-center'}>
                    <Button
                        color={'info'}
                        outline
                        onClick={handlePublish}
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
                        ) : (
                            <></>
                        )}
                        <span className="text-truncate">{event.is_published ? 'Dépublier' : 'Publier'}</span>
                    </Button>
                </div>
                <div className={showDelete ? `col-6 col-md-3 d-flex justify-content-center` : 'col-6 col-md-4 d-flex justify-content-center'}>
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
                                        (<Spinner size="sm" className="flex-shrink-0"  />) :
                                        (
                                            <></>
                                        )
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

export const EvenementListTableDataColumn: TableColumn<EvenementType>[] = [
    {
        name: "Nom",
        cell: (row: EvenementType) => (
            <EvenementListTableName
                image={row?.cover ? `${imageBaseUrl}/projects/${row.cover}` : '/assets/images/programs/programs.png'}
                name={row.name}/>
        ),
        sortable: true,
        grow: 2,
    },
    {
        name: "Date de début",
        selector: (row: EvenementType) => row.started_at,
        sortable: true,
        grow: 1
    },
    {
        name: "Date de fin",
        selector: (row: EvenementType) => row.ended_at,
        sortable: true,
        grow: 1
    },
    {
        name: "Actions",
        cell: (row: EvenementType) => <EvenementListTableAction event={row} showDelete={true}/>,
        grow: 2
    },
];

export const EvenementPublishedListTableData : TableColumn<EvenementType>[] = [
    {
        name: "Nom",
        cell: (row: EvenementType) => (
            <EvenementListTableName
                image={row?.cover ? `${imageBaseUrl}/projects/${row.cover}` : '/assets/images/programs/programs.png'}
                name={row.name}/>
        ),
        sortable: true,
        grow: 2,
    },
    {
        name: "Date de début",
        selector: (row: EvenementType) => row.started_at,
        sortable: true,
        grow: 1
    },
    {
        name: "Date de fin",
        selector: (row: EvenementType) => row.ended_at,
        sortable: true,
        grow: 1
    },
    {
        name: "Actions",
        cell: (row: EvenementType) => <EvenementListTableAction event={row} showDelete={false}/>,
        grow: 2
    },
]

export const EvenementVerticalData = [
    {
        activeTab: 1,
        title: "Informations",
    },
    {
        activeTab: 2,
        title: "Détail",
    },
    {
        title: "Finalisation",
    },
];