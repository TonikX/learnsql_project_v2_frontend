interface Author {
    id: number
    username: string
    first_name: string
    last_name: string
    role: string
}

export interface Comment {
    id: number
    parent_id?: number
    author: Author
    content: string
    created_at: string
    replies_count?: number
    replies?: Comment[]
}

export interface CreateComment {
    content: string
    parent_id?: number
}

export interface DeleteComment {
    id: number
    deleted: boolean
}

export interface Discussion {
    task: number
    messages_count: number
    messages: Comment[]
    created_at: string
    updated_at: string
}
