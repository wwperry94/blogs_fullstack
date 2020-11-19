import React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { newBlog, newAuthor } from "../util/types";

const newBlog: React.FC<IAddBlogProps> = (props: IAddBlogProps) => {
    const [blog, setBlog] = React.useState<newBlog>({
        blog: {
            title: "",
            content: ""
        }
    });
    const [author, setAuthor] = React.useState<newAuthor>({
        author: {
            name: "",
            email: ""
        }
    });

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => setAuthor({
        author:{
            name: e.target.value,
            email: `${name}@3LOGGER.COM`
        }
    });
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setBlog({
        blog: {
            title: e.target.value,
            content: blog.blog.content
        }
    });
    const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setBlog({
        blog: {
            title: blog.blog.title,
            content: e.target.value
        }
    });

    const saveblog = async () => {
        await fetch("/api/blogs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(blog.blog)
        });

        props.history.push("/");
    };

    return (
        <div className="container">
            <div className="card shadow-lg m-2">
                <div className="card-body">
                    <div className="row">
                        <input type="text" className="card-title" placeholder="Title" onChange={onTitleChange} />
                    </div>
                    <div className="row">
                        <textarea className="card-text" placeholder="Post here!" cols={50} rows={15} onChange={onMessageChange}></textarea>
                    </div>
                    <button className="btn btn-sm btn-outline-dark float-right mx-1" onClick={saveblog}>Save</button>
                </div>
            </div>
        </div>
    )
}

interface IAddBlogProps extends RouteComponentProps { }

export default newBlog