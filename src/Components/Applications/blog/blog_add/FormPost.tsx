import Select from "react-select";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useState, useEffect, useCallback, useMemo } from "react";
import "easymde/dist/easymde.min.css";
import { PostCategory, PostTitlePlaceholder } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { createPost } from "@/Redux/Reducers/BlogSlice/postSlice";
import { fetchCategory } from "@/Redux/Reducers/BlogSlice/categoryPostSlice";
import SimpleMdeReact from "react-simplemde-editor";

type SelectOptionType = { value: number; label: string };

const FormPost = () => {

    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState<SelectOptionType[]>([]);
    const [content, setContent] = useState("");

    const { postCategoryData, loading } = useAppSelector((state) => state.postCategory);

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    const categoryOptions : SelectOptionType[] = postCategoryData.map((cat) => ({
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
                category: categories.map((cat) => cat.value), // Extraction des IDs
                content,
            })
        );
    };

    const onChangeContent = useCallback((value: string) => {
        setContent(value);
    }, [])

    const autofocusNoSpellcheckerOptions = useMemo(() => {
        return {
            autofocus: true,
            spellChecker: false,
        } as SimpleMDE.Options;
    }, []);

    console.log(title)

    return (
        <Form className="needs-validation" >
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
                                onChange={(selected) =>
                                    setCategories(selected as SelectOptionType[])
                                }
                                placeholder="Sélectionnez les catégories..."
                                classNamePrefix="react-select"
                            />
                        )}
                    </FormGroup>


                    <FormGroup>
                        <Label>Contenu de l'article :</Label>
                        <SimpleMdeReact
                            options={autofocusNoSpellcheckerOptions}
                            value={content}
                            onChange={onChangeContent}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    );
};

export default FormPost;