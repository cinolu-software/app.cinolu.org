import Select from "react-select"; // Import react-select
import { Col, Form, FormGroup, Input, Label, Row, Button } from "reactstrap";
import { useState, useEffect } from "react";
import SimpleMdeReact from "react-simplemde-editor";
import { BlogPostText, PostCategory, PostTitlePlaceholder } from "@/Constant";
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

    const categoryOptions = postCategoryData.map((cat: any) => ({
        value: cat.id,
        label: cat.name,
    }));


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim() || categories.length === 0 || !content.trim()) {
            alert("Veuillez remplir tous les champs obligatoires !");
            return;
        }

        dispatch(
            createPost({
                title,
                // @ts-ignore
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
                            <Select
                                isMulti
                                options={categoryOptions}
                                value={categories}
                                onChange={(selected) => setCategories(selected || [])}
                                placeholder="Sélectionnez les catégories..."
                                classNamePrefix="react-select"
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
                </Col>
            </Row>
        </Form>
    );
};

export default FormPost;


