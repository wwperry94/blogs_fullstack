import { ReactNode } from "react";

export interface blog {
    blog: any;
    id: number;
    content: string | number | string[];
    email: ReactNode;
    name: ReactNode;
    title: ReactNode;
    
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