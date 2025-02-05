import React from 'react';
import { CategoryListTableColumnType } from "@/Types/Blog/categoryPostType";
import RatioImage from "@/CommonComponent/RatioImage";
import { ImagePath } from "@/Constant";
import { useDispatch } from "react-redux";
import {setModalEditCategory, setModalDeleteCategory} from "@/Redux/Reducers/BlogSlice/categoryPostSlice";
import SVG from '@/CommonComponent/SVG';

const PostCategoryListTableName: React.FC<{ image: string; name: string }> = ({ image, name }) => {
    return (
        <div className="product-names my-2">
            <div className="light-product-box bg-img-cover">
                <RatioImage className="img-fluid" src={`${ImagePath}/${image}`} alt="image" />
            </div>
            <p>{name}</p>
        </div>
    );
};

const PostCategoryListTableAction: React.FC<{ projectCategoryType: any }> = ({ projectCategoryType }) => {

    const dispatch = useDispatch();
    const handleEdit = () => {
        dispatch(setModalEditCategory({ isOpen: true, postCategory: projectCategoryType }));
    };
    const handleDelete = () => {
        dispatch(setModalDeleteCategory({ isOpen: true, postCategory: projectCategoryType }));
    };

    return (
        <div className="product-action">
            <div className={'row w-100 justify-content-center'}>
                <div className={'col-6'}>
                    <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}} onClick={handleEdit}>
                <span>
                  <SVG iconId="editTable"/>
                </span>
                    </button>
                </div>

                <div className={'col-6'}>
                    <button style={{border: 'none', paddingTop: 10, paddingLeft: 10, paddingBottom: 5, borderRadius: 100}} onClick={handleDelete} >
                        <SVG iconId="trashTable" />
                    </button>
                </div>
            </div>
        </div>
    )
};

export const PostCategoryListTableDataColumn = [
    {
        name: "Nom",
        cell: (row: CategoryListTableColumnType) => (
            <PostCategoryListTableName image={'programs/programs.png'} name={row.name || "Unnamed"} />
        ),
        sortable: true,
        grow: 3,
    },
    {
        name: "Action",
        cell: (row: CategoryListTableColumnType) => <PostCategoryListTableAction projectCategoryType={row} />,
        grow: 1
    },
];


export const BlodData = [
    { image: "2", hits: "0", date: "02" },
    { image: "3", hits: "02", date: "03" },
];

export const BlodDataList = ["blog-5.jpg", "blog-6.jpg", "blog-5.jpg", "blog-6.jpg"];

export const RadioData = [
    {
        text: "Text",
    },
    {
        text: "Image",
    },
    {
        text: "Audio",
        defaultChecked: true,
    },
    {
        text: "Video",
    },
];

export const PostTypeData = [{ name: "Lifestyle" }, { name: "Travel" }];