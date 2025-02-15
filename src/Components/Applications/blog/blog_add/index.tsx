import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { BlogDiscardButton, BlogPostButton } from "@/Constant";
import React, { useRef, useState } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import DropzoneClass from "@/Components/Applications/blog/blog_add/DropzoneClass";
import FormPost from "@/Components/Applications/blog/blog_add/FormPost";
import { useAppDispatch } from "@/Redux/Hooks";
import { uploadPostImage } from "@/Redux/Reducers/BlogSlice/postSlice";


const AddPostContainer = () => {

    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const dispatch = useAppDispatch();

    const handleFileUpload = async (postId: string) => {
        if (selectedFile) {
            try {
                await dispatch(uploadPostImage({
                    id: postId,
                    file: selectedFile
                })).unwrap();
                setSelectedFile(null);
                
            } catch (error) {
                console.error("Erreur lors de l'upload de l'image:", error);
            }
        }
    };

    const handleDiscard = () => {
        if (formRef.current) {
            formRef.current.reset();
        }
        setSelectedFile(null);
    };


    return (
        <Container fluid>
            <Row>
                <Col sm="12">
                    <Card>
                        <CommonCardHeader title={"Ajouter un article"} />
                        <CardBody className="add-post">
                            <FormPost
                                // @ts-ignore
                                onFileUpload={handleFileUpload}
                                ref={formRef}
                            />
                            <DropzoneClass onFilesChange={setSelectedFile} />
                            <div className="btn-showcase text-end">
                                <Button
                                    type="submit"
                                    color="primary"
                                    form="post-form"
                                >
                                    {BlogPostButton}
                                </Button>
                                <Button
                                    color="light"
                                    type="button"
                                    onClick={handleDiscard}
                                >
                                    {BlogDiscardButton}
                                </Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default AddPostContainer;

