import { ReactNode } from "react";

export interface blog {
    id?: number,
    content: string,
    email: string,
    name: string,
    title: string,
    authorid: string;
}

export interface blogHome {
    id?: number,
    title: string,
    content: string
}

export interface newBlog {
    blog: {
        title: string,
        content: string
    }
}
export interface newAuthor {
    author: {
        name: string,
        email: string
    }
}