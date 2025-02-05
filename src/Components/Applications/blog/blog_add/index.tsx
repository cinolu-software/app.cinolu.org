import CommonCardHeader from "@/CommonComponent/CommonCardHeader";
import { BlogDiscardButton, BlogPostButton } from "@/Constant";
import React from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import DropzoneClass from "@/Components/Applications/blog/blog_add/DropzoneClass";
import FormPost from "@/Components/Applications/blog/blog_add/FormPost";


const AddPostContainer = () => {

    return (
        <Container fluid>
            <Row>
                <Col sm="12">
                    <Card>
                        <CommonCardHeader title={"Ajouter un article"} />
                        <CardBody className="add-post">
                            <FormPost />
                            <DropzoneClass />
                            <div className="btn-showcase text-end">
                                <Button color="primary">{BlogPostButton}</Button>
                                <Button color="light" type="reset">{BlogDiscardButton}</Button>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

};

export default AddPostContainer;
