import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import SimpleMdeReact from "react-simplemde-editor";
import { BlogPostText, PostCategory, PostTitlePlaceholder, PostTypePlaceholder } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { createPost } from "@/Redux/Reducers/BlogSlice/postSlice";
import { fetchCategory } from "@/Redux/Reducers/BlogSlice/categoryPostSlice";
import {PostCategoryType} from "@/Types/Blog/categoryPostType";

const FormPost = () => {

    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState([]);
    const [content, setContent] = useState("");

    const { postCategoryData, loading } = useAppSelector((state) => state.postCategory);


    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || categories.length === 0 || !content.trim()) {
            alert("Veuillez remplir tous les champs obligatoires !");
            return;
        }

        dispatch(
            createPost({
                title,
                category: categories.map((cat: PostCategoryType) => cat.id),
                content,
            })
        );
    };

    return (
        <Form className="needs-validation" onSubmit={handleSubmit}>
            <Row>
                <Col sm="12">
                    <FormGroup>
                        <Label>Titre de l'article :</Label>
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={PostTitlePlaceholder}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>{PostCategory} :</Label>
                        {loading ? (
                            <p>Chargement des catégories...</p>
                        ) : (
                            <Typeahead
                                id="multiple-typeahead"
                                className="mt-2"
                                onChange={(selected) => setCategories(selected)}
                                options={categoryList}
                                labelKey="name"
                                multiple
                                placeholder={PostTypePlaceholder}
                            />
                        )}
                    </FormGroup>

                    <FormGroup>
                        <Label>Contenu de l'article :</Label>
                        <SimpleMdeReact
                            id="editor_container"
                            value={content}
                            onChange={setContent}
                            options={{
                                autofocus: true,
                                spellChecker: false,
                            }}
                        />
                    </FormGroup>

                    <Button type="submit" color="primary" className="mt-3">
                        Créer l'article
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default FormPost;

