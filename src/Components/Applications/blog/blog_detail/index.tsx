import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchPosts, setModalDeletePost, setModalEditPost } from "@/Redux/Reducers/BlogSlice/postSlice";
import { fetchCategory } from "@/Redux/Reducers/BlogSlice/categoryPostSlice";
import { imageBaseUrl } from "@/services/axios";
import parse from "html-react-parser";
import ModalPostEdit from "@/Components/Applications/blog/blog_detail/ModalPostEdit";
import ModalPostDelete from "@/Components/Applications/blog/blog_detail/ModalPostDelete";

const BlogDetails = () => {

    const dispatch = useAppDispatch();
    const { postData, status: postStatus, isOpenModalDeletePost, isOpenModalEditPost, deleteStatus } = useAppSelector((state) => state.post);
    const { postCategoryData, status: categoryStatus } = useAppSelector((state) => state.postCategory);

    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [filteredPosts, setFilteredPosts] = useState<any[]>([]);

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchCategory());
    }, [dispatch, deleteStatus]);

    useEffect(() => {
        const normalizedPosts = postData.flat();

        const filtered =
            selectedCategory === "all"
                ? normalizedPosts
                // @ts-ignore
                : normalizedPosts.filter((post) => post.category?.id === selectedCategory);
        setFilteredPosts(filtered);
    }, [postData, selectedCategory]);

    if (postStatus === "loading" || categoryStatus === "loading") {
        return <div>Chargement...</div>;
    }

    if (postStatus === "failed" || categoryStatus === "failed") {
        return <div>Erreur lors du chargement des données</div>;
    }

    const truncateContent = (content: string, length: number) => {
        return content.length > length ? content.slice(0, length) + "..." : content;
    };

    return (
        <>
            <ModalPostDelete />
            <ModalPostEdit />
            <div className="post-list-container">
                <div className="filter-section">
                    <label htmlFor="categoryFilter">Filtrer par catégorie :</label>
                    <select
                        id="categoryFilter"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">Toutes les catégories</option>
                        {postCategoryData.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="post-list">
                    {filteredPosts.length === 0 ? (
                        <p>Aucun article trouvé.</p>
                    ) : (
                        filteredPosts.map((post) => (
                            <div className="post-card" key={post.id}>
                                {post.image && (
                                    <img
                                        src={`${imageBaseUrl}/posts/${post.image}`}
                                        alt={post.title}
                                        className="post-card-image"
                                    />
                                )}
                                <div className="post-card-content">
                                    <h3 className="post-card-title">{post.title}</h3>
                                    <div className="post-card-excerpt">
                                        {parse(truncateContent(post?.content || "", 150))}
                                    </div>
                                    <small className="post-card-category">
                                        Catégorie : {post.category?.name || "Non catégorisé"}
                                    </small>

                                    <div className="post-card-actions">
                                        <button
                                            className="edit-button"
                                            onClick={() =>
                                                dispatch(setModalEditPost({ isOpen: !isOpenModalEditPost, post }))
                                            }
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                dispatch(setModalDeletePost({ isOpen: !isOpenModalDeletePost, post }))
                                            }
                                        >
                                            <FaTrash />
                                        </button>

                                        <button
                                            className="delete-button"
                                            onClick={() =>
                                                dispatch(setModalDeletePost({ isOpen: !isOpenModalDeletePost, post }))
                                            }
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export default BlogDetails;
