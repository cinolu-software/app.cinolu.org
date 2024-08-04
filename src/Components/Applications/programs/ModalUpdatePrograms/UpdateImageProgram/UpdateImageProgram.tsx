import React, {useState} from "react";
import {Card, CardBody, Col, Row} from "reactstrap";
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import {ImagePath} from "@/Constant";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UpdateImageProgram: React.FC = () => {


    const [files, setFiles] = useState<any[]>([]);


    return (
        <>
            <Row>
                <Col className={"col-4"}>
                    <Card>
                        <div className="blog-box blog-shadow">
                            <img className="" src={`${ImagePath}/blog/blog.jpg`} alt="blog image"/>
                        </div>
                    </Card>
                </Col>

                <Col className={"col-8 "} >
                    <FilePond
                        files={files}
                        allowReorder={true}
                        allowMultiple={false}
                        maxFiles={1}
                        onupdatefiles={setFiles}
                        labelIdle='Drag & Drop your files or <span class="filepond--label-action text-danger text-decoration-none">Browse</span>'
                    />
                </Col>
            </Row>
            <Row>
                <button className="btn btn-primary mt-3">
                    Mise à jour
                </button>
            </Row>

        </>
    );
};

export default UpdateImageProgram;