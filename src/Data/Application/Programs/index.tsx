import React, {useState} from 'react';
import {ReceiveProgramsType} from "@/Types/Programs/ProgramsType";
import RatioImage from "@/CommonComponent/RatioImage";
import {useDispatch} from "react-redux";
import {setModalDeleteProgram, setSelectedProgram} from "@/Redux/Reducers/programsSlice/programsSlice";
import {TableColumn} from "react-data-table-component";
import {useRouter} from "next/navigation";
import {imageBaseUrl} from "@/services/axios";
import SVG from '@/CommonComponent/SVG';
import {Spinner} from 'reactstrap'


const ProgramsListTableName: React.FC<{ image: string, name: string }> = ({image, name}) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${image}`} alt="image"/>
            </div>
            <p>{name}</p>
        </div>
    );
};

const ProgramsListTableAction: React.FC<{ program: any }> = ({ program }) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const [loadingEdit, setLoadingEdit] = useState(false);
    const [loadingDetail, setLoadingDetail] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const handleEdit = async () => {
        setLoadingEdit(true);
        router.push('/programs/edit_program');
        dispatch(setSelectedProgram({ program }));
    };

    const handleDetail = async () => {
        setLoadingDetail(true);
        router.push('/programs/detail_program');
        dispatch(setSelectedProgram({program}));
    };

    const handleDelete = async () => {
        setLoadingDelete(true);
        dispatch(setModalDeleteProgram({ isOpen: true, program }));
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

export const ProgramsListTableDataColumn: TableColumn<ReceiveProgramsType>[] = [
    {
        name: "Nom",
        cell: (row: ReceiveProgramsType) => (
            <ProgramsListTableName image={row?.image ? `${imageBaseUrl}/programs/${row.image}`: '/assets/images/programs/programs.png'} name={row.name}/>
        ),
        sortable: true,
        grow: 1,
    },
    {
        name: "Date de début",
        selector: (row: ReceiveProgramsType) => row.started_at,
        sortable: true,
        grow: 1
    },
    {
        name: "Date de fin",
        selector: (row: ReceiveProgramsType) => row.ended_at,
        sortable: true,
        grow: 1
    },
    {
        name: "Actions",
        cell: (row: ReceiveProgramsType) => <ProgramsListTableAction program={row}/>,
        grow: 2
    },
];

export const AddProgram = [
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



