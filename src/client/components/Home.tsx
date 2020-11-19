import React from 'react';
import { Link } from "react-router-dom";
import { blogHome } from '../util/types';


const Home: React.FC<IHomeProps> = () => {
    const [blogs, setblogs] = React.useState<blogHome[]>([]);

    React.useEffect(() => {
        fetchblogs();
    }, []);

    const fetchblogs = async () => {
        try {
            let res = await fetch("/api/blogs/")
            let blogs: blogHome[] = await res.json();
            console.log("testing", blogs)
            blogs.reverse();
            setblogs(blogs);
        } catch (err) {
            console.log(err)
        }
    }

    return (

        <div className="card shadow-lg m-2">
            {blogs.map((blog: blogHome) => (
                // console.log('blogID', blog.id)
                <div key={blog.id} className="card">
                    <div className="card-body">
                        <h5 className="card-title">{blog.title}</h5>
                        <p className="card-text">{blog.content}</p>
                        <Link to={`/blogs/${blog.id}`}>
                            <button className="btn btn-sm btn-outline-dark float-right">3LOG EDITOR</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
        

    )
}

interface IHomeProps { }

export default Home
