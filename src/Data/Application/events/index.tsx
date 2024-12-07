import React, {useState} from 'react';
import {Event} from "@/Types/Events";
import RatioImage from "@/CommonComponent/RatioImage";
import {useAppDispatch} from "@/Redux/Hooks";
import {setModalDeleteEvent, setSelectedEvent} from "@/Redux/Reducers/eventSlice/eventSlice";
import {TableColumn} from "react-data-table-component";
import {useRouter} from "next/navigation";
import {imageBaseUrl} from "@/services/axios";
import SVG from '@/CommonComponent/SVG';
import {Spinner} from 'reactstrap'


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

    const handleEdit = async () => {
        setLoadingEdit(true);
        router.push('/events/eventEdit');
        dispatch(setSelectedEvent({ event }));
    };

    const handleDetail = async () => {
        setLoadingDetail(true);
        router.push('/events/eventDetail');
        dispatch(setSelectedEvent({ event }));
    };

    const handleDelete = async () => {
        setLoadingDelete(true);
        dispatch(setModalDeleteEvent({ isOpen: true, event }));
    };



    return (
        <div className="product-action">
            <div className="row w-100 justify-content-center">
                <div className="col-4">
                    <button
                        style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                        onClick={handleEdit}
                        disabled={loadingEdit}
                    >
                        {loadingEdit ? <Spinner size="sm"/> : <SVG iconId="editTable"/>}
                    </button>
                </div>

                <div className="col-4">
                    <button
                        style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                        onClick={handleDetail}
                        disabled={loadingDetail}
                    >
                        {loadingDetail ? <Spinner size="sm"/> : <SVG iconId="moreTable"/>}
                    </button>
                </div>

                <div className="col-4">
                    <button
                        style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                        onClick={handleDelete}
                        disabled={loadingDelete}
                    >
                        {loadingDelete ? <Spinner size="sm"/> : <SVG iconId="trashTable"/>}
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
            <EventsListTableName image={row?.image ? `${imageBaseUrl}/programs/${row.image}`: '/assets/images/programs/programs.png'} name={row.name}/>
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

export const AddEvent = [
    {
        id: 1,
        // icon: "info",
        title: "Information du programme",
        detail:"Nom et Description",
    },
    {
        id: 2,
        // icon: "calendar",
        title: "Durée du programme",
        detail: "date de début et de fin"
    },
    {
        id: 3,
        // icon: "type",
        title: "Type de programme",
        detail: "Sélectionner le type de programme"
    },
    {
        id: 4,
        // icon: "pricing",
        // icon: "requirement",
        title: "Exigence",
        detail: "Requirements"
    },
    {
        id: 5,
        // icon: "pricing",
        // icon: "partners",
        title: "Partenaires",
        detail: "Partenaires"
    },
];

export const NumberWizardData = [
    {
        text: "Fill up your details and proceed next steps.",
    },
];