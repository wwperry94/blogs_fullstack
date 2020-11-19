import React from 'react';
import { RouteComponentProps } from "react-router-dom";
import authors from '../../server/db/authors';
import { blog } from '../util/types'


const SingleBlog: React.FC<ISingleBlogProps> = (props: ISingleBlogProps) => {
    const [blog, setblog] = React.useState<blog>({
        id: Number(""),
        content: "",
        email: "",
        name: "",
        title: "",
        authorid: ""
    });
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                let res = await fetch(`/api/blogs/${props.match.params.id}`);
                let blog = await res.json();
                await setblog(blog);
                if (blog) {
                    setLoading(false);
                }
            } catch (err) {
                console.log(err);
            }
        })();
    }, []);

    const deleteBlog = async (id: number) => {
        console.log("ID", id);
        await fetch(`/api/blogs/${id}`, {
            method: "DELETE"
        });

        props.history.push("/");
    };

    const editBlog = async (id: number) => {
        const newContent = {
            content: blog.content,
        }
        await fetch(`/api/blogs/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newContent)
        });

        props.history.push("/");
    };

    const onMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setblog({
        id: blog.id,
        content: e.target.value,
        email: blog.email,
        name: blog.name,
        title: blog.title,
        authorid: blog.authorid
    }
    );

    if (loading) {
        return (
            <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        )
    } else {
        return (
            <div className="container">
                <div className="card shadow-lg m-2">
                    <div className="card-body">
                        <div className="row">
                            <h1 className="card-title">{blog.title}</h1>
                        </div>
                        <div className="row">
                            <h5 className="card-text">Written by: {blog.name}</h5>
                        </div>
                        <div className="row">
                            <h5 className="card-featured">email: {blog.email}</h5>
                        </div>
                        <div className="row">
                            <textarea
                                className="card-text"
                                defaultValue={blog.content}
                                cols={50} rows={15}
                                onChange={(e) => onMessageChange(e)}
                            ></textarea>
                        </div>
                        <button className="btn btn-sm btn-outline-dark float-right mx-1" onClick={() => editBlog(blog.id)}>Save</button>
                        <button className="btn btn-sm btn-outline-dark float-right mx-1" onClick={() => deleteBlog(blog.id)}>Delete</button>
                    </div>
                </div>
            </div>

        )
    }
}

interface ISingleBlogProps extends RouteComponentProps<{ id: string }> {

}

export default SingleBlog; 
