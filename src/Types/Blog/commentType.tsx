export interface CreateComment {
    content: string;
    post: string;
}

export interface UpdateComment {
    id: string;
    content: string;
}

export interface InitialStateComment {
    comments: any;
    status: 'idle' | 'loading' | 'success' | 'failed';
    error: string | null;
}