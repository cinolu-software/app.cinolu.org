import Select from "react-select";
import { Col, Form, FormGroup, Input, Label, Row } from "reactstrap";
import React, { useState, useEffect } from "react";
import "easymde/dist/easymde.min.css";
import { PostCategory, PostTitlePlaceholder } from "@/Constant";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { createPost } from "@/Redux/Reducers/BlogSlice/postSlice";
import { fetchCategory } from "@/Redux/Reducers/BlogSlice/categoryPostSlice";
import { Flip, toast } from "react-toastify";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {useRouter} from "next/navigation";

type SelectOptionType = { value: string; label: string };

const FormPost = ({ onFileUpload }: { onFileUpload: (file: File) => void }) => {

    const dispatch = useAppDispatch();
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState<SelectOptionType | null>(null);
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { postCategoryData, loading } = useAppSelector((state) => state.postCategory);
    const router = useRouter();

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
                toast.success(
                    <p className="text-white tx-16 mb-0">"Article créé avec succès !"</p>,
                    {
                        autoClose: 5000,
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar: false,
                        transition: Flip,
                        theme: "colored",
                    }
                );
            }
            router.push("/blog/blog_detail");
        }
        catch (error) {
            toast.error(
                <p className="text-white tx-16 mb-0">{`Erreur lors de la création: ${error}`}</p>,
                {
                    autoClose: 5000,
                    position: toast.POSITION.TOP_CENTER,
                    hideProgressBar: false,
                    transition: Flip,
                    theme: "colored",
                }
            );
        }
        finally {
            setIsSubmitting(false);
        }
    };


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
                        <ReactQuill
                            value={content}
                            onChange={setContent}
                            placeholder="Écrivez votre article ici..."
                            theme="snow"
                        />
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    );
};

export default FormPost;