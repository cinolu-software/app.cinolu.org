import React from 'react';
import { Button } from "reactstrap";
import {EventsListTypeTableColumnType, EventType} from "@/Types/EventsType/eventsTypeType"
import RatioImage from "@/CommonComponent/RatioImage";
import { ImagePath } from "@/Constant";
import {useAppDispatch} from "@/Redux/Hooks";
import { setModalDeleteEventTypes , setModalEditEventTypes} from "@/Redux/Reducers/eventSlice/EventTypeSlice"
import SVG from '@/CommonComponent/SVG';


const EventsListTableName: React.FC<{ image: string; name: string }> = ({ image, name }) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${ImagePath}/${image}`} alt="image" />
            </div>
            <p>{name}</p>
        </div>
    );
};

const EventsListTableAction: React.FC<{ eventType: EventType }> = ({ eventType }) => {
    const dispatch = useAppDispatch();

    const handleEdit = () => {
        dispatch(setModalEditEventTypes({ isOpen: true, EventType: eventType}));
    };

    const handleDelete = () => {
        dispatch(setModalDeleteEventTypes({ isOpen: true, EventType: eventType}));
    };

    return (
        <div className="product-action">
            <div className={'row w-100 justify-content-center'}>
                <div className={'col-6'}>
                    <button
                        style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                        onClick={handleEdit}
                        className={'btn-info'}
                    >
                <span>
                  <SVG iconId="editTable"/>
                </span>
                    </button>
                </div>

                <div className={'col-6'}>
                    <button
                        style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}}
                        onClick={handleDelete}
                        className={'btn-info'}
                    >
                        <SVG iconId="trashTable" />
                    </button>
                </div>
            </div>
        </div>
    )
};

export const EventsListTableDataColumn = [
    {
        name: "Nom",
        cell: (row: EventsListTypeTableColumnType) => (
            <EventsListTableName image={row.image ?? "default_program_image.png"} name={row.name || "Unnamed"} />
        ),
        sortable: true,
        grow: 3,
    },
    // {
    //     name: "Description",
    //     selector: (row: ProgramsListTypeTableColumnType) => (
    //         <div>{row.description}</div>
    //     ),
    //     sortable: false,
    //     grow: 1
    // },
    {
        name: "Action",
        cell: (row: EventsListTypeTableColumnType) => <EventsListTableAction eventType={row} />,
        grow: 1
    },
];
