import React , {useMemo, useState, useEffect} from "react";
import DataTable from "react-data-table-component";
import { Card, CardBody, Col, Container, Input, Label, Row } from "reactstrap";
import ModalCreatePostCategory from "./ModalCreatePostCategory";
import DeleteEntityModal from "@/CommonComponent/DeleteEntityModal";
import {useAppDispatch, useAppSelector} from "@/Redux/Hooks";
import {fetchCategory, deleteCategory, setModalDeleteCategory} from "@/Redux/Reducers/BlogSlice/categoryPostSlice";
import {PostCategoryListTableDataColumn} from "@/Data/Application/Blog";
import {PostCategoryHeader} from "@/Components/Applications/blog/blog_category/PostCategoryHeader";
import ModalUpdatePostCategory from "./ModalUpdatePostCategory";
import TableSkeleton from "@/CommonComponent/TableSkeleton";

const BlogCategoryContainer  = () => {

    const [filterText, setFilterText] = useState("");
    const dispatch = useAppDispatch();
    const {status, isOpenModalDeleteCategory, postCategoryData, selectedCategory} = useAppSelector(state => state.postCategory);

    const subHeaderComponentMemo = useMemo(() => {
        return (
            <div className="dataTables_filter d-flex align-items-center">
                <Label className="me-2">{"Chercher"}:</Label>
                <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilterText(e.target.value)} type="search" value={filterText}/>
            </div>
        );
    }, [filterText]);

    useEffect(() => {
        if(status === "idle" || status === "loading"){
            dispatch(fetchCategory());
        }
    }, [status, dispatch]);


    const filteredPostCategory = postCategoryData?.filter(postCategory => postCategory.name?.toLowerCase()?.includes(filterText.toLowerCase()));


    return (
        <Container fluid>

            <ModalCreatePostCategory />
            <DeleteEntityModal
                isOpen={isOpenModalDeleteCategory}
                entityName={"Catégorie d'article"}
                selectedEntity={selectedCategory}
                entities={postCategoryData}
                deleteEntityThunk={deleteCategory}
                setModalAction={setModalDeleteCategory as any}
            />
            <ModalUpdatePostCategory/>
            {
                status !== 'succeeded' ? <TableSkeleton/> : (
                    <Row>
                        <Col sm="12">
                            <Card>
                                <CardBody>
                                    <div className="list-product-header">
                                        <PostCategoryHeader />
                                    </div>
                                    <div className="list-program">
                                        <div className="table-responsive">
                                            <DataTable
                                                className="theme-scrollbar"
                                                data={filteredPostCategory}
                                                columns={ PostCategoryListTableDataColumn }
                                                striped
                                                highlightOnHover
                                                pagination
                                                subHeader
                                                subHeaderComponent={subHeaderComponentMemo}
                                            />
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                )
            }
        </Container>
    )
}

export default BlogCategoryContainer;