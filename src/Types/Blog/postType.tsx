export interface Post  {
    map(arg0: (post: any) => import("react").JSX.Element): import("react").ReactNode | Iterable<import("react").ReactNode>;
    id: string;
    title: string,
    content: string,
    category: string,
    created_at: string,
    updated_at: string,
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
}
