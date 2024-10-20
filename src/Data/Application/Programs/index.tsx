import React from 'react';
import {ReceiveProgramsType} from "@/Types/Programs/ProgramsType";
import RatioImage from "@/CommonComponent/RatioImage";
import {useDispatch} from "react-redux";
import {setModalDeleteProgram, setModalEditProgram, setSelectedProgram} from "@/Redux/Reducers/programsSlice/programsSlice";
import {TableColumn} from "react-data-table-component";
import {Button} from "reactstrap";
import Link from 'next/link'
import {useRouter} from "next/navigation";
import {useAppSelector} from "@/Redux/Hooks";


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

const ProgramsListTableAction: React.FC<{ program: any }> = ({program}) => {

    const dispatch = useDispatch();
    const router = useRouter();

    const handleEdit = () => {
        dispatch(setSelectedProgram({ program }));
        router.push('/programs/edit_program');
    };

    const handleDelete = () => {
        dispatch(setModalDeleteProgram({isOpen: true, program}));
    };

    const handleDetail = () => {
        dispatch(setSelectedProgram({ program }));
        router.push('/programs/detail_program');
    }

    return (
        <div className={"product-action"}>
            <div className={'product-action'}>
                <Button color={'outline-primary'} className={'me-2'} onClick={handleEdit}>Modifier</Button>
                <Button color={'outline-dark'} className={'me-2'} onClick={handleDetail}>Détail</Button>
                <Button color={'outline-danger'} onClick={handleDelete}>Supprimer</Button>
            </div>
        </div>
    );

};

export const ProgramsListTableDataColumn: TableColumn<ReceiveProgramsType>[] = [
    {
        name: "Nom",
        cell: (row: ReceiveProgramsType) => (
            <ProgramsListTableName image={'/assets/images/programs/programs.png'} name={row.name}/>
        ),
        sortable: true,
        grow: 1,
    },
    // {
    //     name: "Description",
    //     selector: (row: ReceiveProgramsType) => row.description,
    //     sortable: false,
    //     grow: 1
    //
    // },
    {
        name: "Date de début",
        selector: (row: ReceiveProgramsType) => row.start_at,
        sortable: true,
        grow: 1
    },
    {
        name: "Date de fin",
        selector: (row: ReceiveProgramsType) => row.end_at,
        sortable: true,
        grow: 1
    },
    {
        name: "Action",
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
  ]

