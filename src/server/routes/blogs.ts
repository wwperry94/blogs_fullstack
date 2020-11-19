import * as express from 'express';
import db from '../db';

const router: express.Router = express.Router();

// route is already /api/blogs

router.get("/", async (req: express.Request, res: express.Response) => {
    try {
        const blogs = await db.Blogs.all();
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.get("/:id", async (req: express.Request, res: express.Response) => {
    try {
        const id = Number(req.params.id),
            blog = await db.Blogs.one(id),
            blogtags = await db.BlogTags.one(id);
        blog[0].tags = blogtags[0];
        res.json(blog[0]);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// creates a new author as well as a blog
router.post("/", async (req: express.Request, res: express.Response) => {
    try {
        const author = req.body.author,
            blog = req.body.blog,
            blogtags = req.body.blog.tags

        const newAuthor = await db.Authors.insert(author.name, author.email),
            newBlog = await db.Blogs.insert(blog.title, blog.content, newAuthor.insertId),
            newBlogTags = await db.BlogTags.insert(newBlog.insertId, blogtags);

        res.status(200).send(`
            author created with id: ${newAuthor.insertId}
            blog created with id: ${newBlog.insertId}
        `);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.put("/:id", async (req: express.Request, res: express.Response) => {
    try {
        const content: string = req.body.content,
            id = Number(req.params.id);

        await db.Blogs.update(content, id);

        res.status(200).send(`blog edited at id: ${id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

router.delete("/:id", async (req: express.Request, res: express.Response) => {
    try {
        const id = Number(req.params.id);

        await db.Blogs.deleteBlog(id);

        res.status(200).send(`blog deleted at id: ${id}`);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

export default router