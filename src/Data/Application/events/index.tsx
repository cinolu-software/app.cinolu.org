import React, {useState} from 'react';
import {Event} from "@/Types/Events";
import RatioImage from "@/CommonComponent/RatioImage";
import {useAppDispatch} from "@/Redux/Hooks";
import {setModalDeleteEvent, setSelectedEvent, publishEvent } from "@/Redux/Reducers/eventSlice/eventSlice";
import {TableColumn} from "react-data-table-component";
import {useRouter} from "next/navigation";
import {imageBaseUrl} from "@/services/axios";
import SVG from '@/CommonComponent/SVG';
import {Spinner} from 'reactstrap';
import { Flip, toast } from "react-toastify";


const EventsListTableName: React.FC<{ image: string, name: string }> = ({image, name}) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${image}`} alt="image"/>
            </div>
            <p>{name}</p>
        </div>
    );
};

const EventsListTableAction: React.FC<{ event: any }> = ({ event }) => {

    const dispatch = useAppDispatch();
    const router = useRouter();

    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [loadingPublish, setLoadingPublish] = useState(false);

    const handleEdit = async () => {
        setLoadingEdit(true);
        router.push('/events/eventEdit');
        dispatch(setSelectedEvent({ event }));
    };

    const handleDetail = async () => {
        setLoadingDetail(true);
        router.push('/events/eventsDetail');
        dispatch(setSelectedEvent({ event }));
    };

    const handleDelete = async () => {
        setLoadingDelete(true);
        dispatch(setModalDeleteEvent({ isOpen: true, event }));
    };

    const handlePublish = async () => {
        try {
            setLoadingPublish(true);
            setTimeout(() => {
                    dispatch(publishEvent({ eventId: event.id }));
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
                        disabled={loadingPublish}
                    >
                        {loadingPublish ? <Spinner size="sm"/> : <SVG iconId="published"/>}
                    </button>
                </div>
                <div className="col-3">
                    <button
                        style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                        onClick={handleDelete}
                        disabled={loadingDelete}
                        className={'btn-info'}
                    >
                        { <SVG iconId="trashTable"/>}
                    </button>
                </div>
            </div>
        </div>
    );

};

export const EventsListTableDataColumn: TableColumn<Event>[] = [
    {
        name: "Nom",
        cell: (row: Event) => (
            <EventsListTableName
                image={row?.image ? `${imageBaseUrl}/events/${row.image}` : '/assets/images/programs/programs.png'}
                name={row.name}/>
        ),
        sortable: true,
        grow: 1,
    },
    {
        name: "Date de début",
        selector: (row: Event) => row.started_at,
        sortable: true,
        grow: 1
    },
    {
        name: "Date de fin",
        selector: (row: Event) => row.ended_at,
        sortable: true,
        grow: 1
    },
    {
        name: "Actions",
        cell: (row: Event) => <EventsListTableAction event={row}/>,
        grow: 2
    },
];
