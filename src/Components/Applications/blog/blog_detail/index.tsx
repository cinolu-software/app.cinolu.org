import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/Redux/Hooks";
import { fetchPosts } from "@/Redux/Reducers/BlogSlice/postSlice";
import { fetchCategory } from "@/Redux/Reducers/BlogSlice/categoryPostSlice";
import { imageBaseUrl } from "@/services/axios";
import parse from "html-react-parser";
import Link from "next/link";

const BlogDetails = () => {

    const dispatch = useAppDispatch();
    const { postData, status: postStatus } = useAppSelector((state) => state.post);
    const { postCategoryData, status: categoryStatus } = useAppSelector((state) => state.postCategory);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");

    useEffect(() => {
        dispatch(fetchPosts());
        dispatch(fetchCategory());
    }, [dispatch]);


    const filteredPosts = selectedCategory === "all"
        ? postData
        // @ts-ignore
        : postData.filter((post) => post.category?.id === selectedCategory);

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
                    filteredPosts[0].map((post) => (
                        <Link href={`/blog/${post.id}`} key={post.id} passHref>
                            <div className="post-card" style={{ cursor: "pointer" }}>
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
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default BlogDetails;
