import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { blog } from '../util/types';
const AddNewBlog: React.FC<IAddNewBlogProps> = (props: IAddNewBlogProps) => {
    const [blog, setBlog] = React.useState<blog>({
        content: "",
        email: "",
        name: "",
        title: "",
        authorid: ""
    });
    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setBlog({
        content: blog.content,
        email: blog.email,
        name: e.target.value,
        title: blog.title,
        authorid: blog.authorid
    });
    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setBlog({
        content: blog.content,
        email: e.target.value,
        name: blog.name,
        title: blog.title,
        authorid: blog.authorid
    });
    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setBlog({
        content: blog.content,
        email: blog.email,
        name: blog.name,
        title: e.target.value,
        authorid: blog.authorid
    });
    const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setBlog({
        content: e.target.value,
        email: blog.email,
        name: blog.name,
        title: blog.title,
        authorid: blog.authorid
    });
    const saveBlog = async () => {
        await fetch('/api/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(blog)
        });
        props.history.push('/');
    }
    return (
        <div className='container'>
            <div className='card shadow-lg m-2'>
                <div className='card-body'>
            <div className='row'>
                <input type='text' className='card-title' onChange={onTitleChange} placeholder='Title' />
            </div>
            <div className='row'>
                <input type='text' className='card-title' onChange={onNameChange} placeholder='Name' />
                <input type='text' className='card-title' onChange={onEmailChange} placeholder='Email' />
            </div>
            <div className='row'>
                <textarea className='card-text' cols={50} rows={15} onChange={onContentChange} placeholder='Blog'></textarea>
            </div>
            <button className='btn btn-sm btn-outline-warning float-right mx-1 mt-3' onClick={saveBlog}>Save</button>
                </div>
            </div>
        </div>
    )
}

interface IAddNewBlogProps extends RouteComponentProps { }
export default AddNewBlog;
