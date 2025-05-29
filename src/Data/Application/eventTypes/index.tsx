import React from 'react';
import { Button } from "reactstrap";
import {EventsListTypeTableColumnType, EventType} from "@/Types/EventsType/eventsTypeType";
import RatioImage from "@/CommonComponent/RatioImage";
import { ImagePath } from "@/Constant";
import {useAppDispatch} from "@/Redux/Hooks";
import { setModalDeleteEventTypes , setModalEditEventTypes} from "@/Redux/Reducers/eventSlice/EventTypeSlice";


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
                            <></>
                            // <SVG iconId="editTable" className="d-none d-md-inline flex-shrink-0" />
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
                            <></>
                            // <SVG iconId="trashTable" className="d-none d-md-inline flex-shrink-0" />
                        }
                        <span className="text-truncate">Supprimer</span>
                    </Button>
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
    {
        name: "Action",
        cell: (row: EventsListTypeTableColumnType) => <EventsListTableAction eventType={row} />,
        grow: 1
    },
];
