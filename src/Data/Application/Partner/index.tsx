import React, {useState} from 'react';
import {PartnerListTableColumnType, PartnerType} from "@/Types/PartnerType/PartnerType";
import RatioImage from "@/CommonComponent/RatioImage";
import {ImagePath} from "@/Constant";
import {useAppDispatch} from "@/Redux/Hooks";
import {setModalDeletePartner, setSelectedPartner} from "@/Redux/Reducers/PartnersSlice/partnerSlice";
import SVG from '@/CommonComponent/SVG';
import {useRouter} from "next/navigation";
import {Button, Spinner} from "reactstrap";
import {imageBaseUrl} from "@/services/axios";
import {truncateText} from "@/utils";

const PartnerListTableName: React.FC<{image: string; name: string}> = ({image, name}) =>{
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${image}`} alt="image"/>
            </div>
            <p>{name}</p>
        </div>
    )
}

const PartnerListTableAction: React.FC<{partner: PartnerType}> = ({partner}) =>{

    const dispatch = useAppDispatch();
    const router = useRouter();

    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const handleShowDetail = () =>{
        setLoadingDetail(true)
        router.push('/partners/detail')
        dispatch(setSelectedPartner({partner}))
    }

    const handleEdit = () => {
        setLoadingEdit(true)
        router.push('/partners/update')
        dispatch(setSelectedPartner({partner}))
    }

    const handleDelete = () => {
        setLoadingDelete(true)
        dispatch(setModalDeletePartner({isOpen: true, partner: partner}))
        setLoadingDelete(false)
    }

    return (
        <div className="product-action">
            <div className="row w-100 justify-content-center g-2">
                <div className="col-4 col-md-4 d-flex justify-content-center">
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
                            // <SVG iconId="editTable" className="d-none d-md-inline flex-shrink-0" />
                        )}
                        <span className="text-truncate">Modifier</span>
                    </Button>
                </div>
                <div className="col-4 col-md-4 d-flex justify-content-center">
                    <Button
                        color="info"
                        outline
                        onClick={handleShowDetail}
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
                            // <SVG iconId="moreTable" className="d-none d-md-inline flex-shrink-0" />
                        )}
                        <span className="text-truncate">Détails</span>
                    </Button>
                </div>
                <div className="col-4 col-md-4 d-flex justify-content-center">
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
                        {loadingDelete ? (
                            <Spinner size="sm" className="flex-shrink-0" />
                        ) : (
                            <></>
                            // <SVG iconId={isPublished ? 'unpublish_call' : 'publish_call'} />
                        )}
                        <span className="text-truncate">{'Supprimer'}</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export const PartnerListTableDataColumn = [
    {
        name: "Partenaire",
        cell:(row: PartnerListTableColumnType) => <PartnerListTableName image={row?.profile ? `${imageBaseUrl}/partners/${row.profile}` : `${ImagePath}/programs/types/typeProgram.png`} name={row.name}/>,
        sortable: true,
        grow: 1
    },
    {
        name: "Description",
        cell: (row: PartnerListTableColumnType) => (
            <div>
                {truncateText(row.description, 100)}
            </div>
        ),
        sortable: true,
        grow: 1,
    },
    {
        name: "Website link",
        cell:(row: PartnerListTableColumnType) => <div>{row.website_link}</div>,
        sortable: true,
        grow: 1
    },
    {
        name: "Actions",
        cell: (row: PartnerListTableColumnType) => <PartnerListTableAction partner={row}/>,
        sortable: false,
        grow: 1
    }
]