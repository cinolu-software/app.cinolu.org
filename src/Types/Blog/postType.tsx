export interface Post  {
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

}
