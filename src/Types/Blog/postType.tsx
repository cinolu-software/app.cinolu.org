export interface Post  {
    map(arg0: (post: any) => import("react").JSX.Element): import("react").ReactNode | Iterable<import("react").ReactNode>;
    id: string;
    title: string,
    content: string,
    category: string,
    created_at: string,
    updated_at: string,
}

export interface PostCategory {
    id: string;
    name: string;
    slug: string;
}

export interface GetPostsType {
    id: string;
    title: string;
    content: string;
    image: string;
    category: PostCategory;
}

export interface GetCommentType {
    post: { id: string };
    content: string;
    by: {id: string};
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

export interface AuthorType {
    id: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
    email: string;
    name: string;
    password: string;
    phone_number: string;
    address: string;
    google_image: string;
    profile: string;
    verified_at: string;
}

export interface GetPostType extends GetPostsType {
    comment ?: GetCommentType;
    author ?: AuthorType;
}

export interface CreatePost {
    title: string,
    content: string,
    category: string,
}

export interface UpdatePost extends CreatePost {
    id: string,
}

export interface InitialStatePost {
    postData : Post[];
    status: 'idle' | 'loading' | 'success' | 'failed';
    error: string | null;
    isOpenModalEditPost: boolean;
    isOpenModalDeletePost: boolean;
    selectedPost: GetPostType | null;
}
