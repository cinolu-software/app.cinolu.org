import Select from "react-select";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { useState, useEffect, useCallback, useMemo } from "react";
import "easymde/dist/easymde.min.css";
import { PostCategory, PostTitlePlaceholder } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { createPost, uploadPostImage } from "@/Redux/Reducers/BlogSlice/postSlice";
import { fetchCategory } from "@/Redux/Reducers/BlogSlice/categoryPostSlice";
import SimpleMdeReact from "react-simplemde-editor";

type SelectOptionType = { value: string; label: string };

const FormPost = ({ onFileUpload }: { onFileUpload: (file: File) => void }) => {
    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState<SelectOptionType | null>(null);
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { postCategoryData, loading } = useAppSelector((state) => state.postCategory);
    const { status, error } = useAppSelector((state) => state.post);

    useEffect(() => {
        dispatch(fetchCategory());
    }, [dispatch]);

    const categoryOptions: SelectOptionType[] = postCategoryData.map((cat) => ({
        value: cat.id,
        label: cat.name,
    }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!title.trim() || !category || !content.trim()) {
            alert("Veuillez remplir tous les champs obligatoires !");
            setIsSubmitting(false);
            return;
        }

        try {
            const resultAction = await dispatch(createPost({
                title,
                category: category.value,
                content,
            }));

            if (createPost.fulfilled.match(resultAction)) {
                const newPost = resultAction.payload;
                if (onFileUpload) {
                    await onFileUpload(newPost.id);
                }

                setTitle("");
                setContent("");
                setCategory(null);
                alert("Article créé avec succès !");
            }
        } catch (error) {
            console.error("Erreur lors de la création:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onChangeContent = useCallback((value: string) => {
        setContent(value);
    }, []);

    const editorOptions = useMemo(() => ({
        autofocus: true,
        spellChecker: false,
        minHeight: "300px",
        status: false,
    }), []);

    return (
        <Form className="needs-validation" onSubmit={handleSubmit} id="post-form">
            <Row>
                <Col sm="12">
                    <FormGroup>
                        <Label>Titre de l'article :</Label>
                        <Input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder={PostTitlePlaceholder}
                            disabled={isSubmitting}
                        />
                    </FormGroup>

                    <FormGroup>
                        <Label>{PostCategory} :</Label>
                        {loading ? (
                            <p>Chargement des catégories...</p>
                        ) : (
                            <Select
                                options={categoryOptions}
                                value={category}
                                onChange={(selected) => setCategory(selected)}
                                placeholder="Sélectionnez une catégorie..."
                                classNamePrefix="react-select"
                                isDisabled={isSubmitting}
                            />
                        )}
                    </FormGroup>

                    <FormGroup>
                        <Label>Contenu de l'article :</Label>
                        <SimpleMdeReact
                            options={editorOptions}
                            value={content}
                            onChange={onChangeContent}
                            // disabled={isSubmitting}
                        />
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    );
};

export default FormPost;