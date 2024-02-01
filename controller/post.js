const { StatusCodes } = require("http-status-codes");

class PostController {
    constructor(container) {
        this.postService = container.get("PostService");
    }

    async handleGetPostList(req, res) {
        const postListDTO = {
            page: Number(req.query.page),
            limit: Number(req.query.limit),
            category: req.query.category
        };
        const postList = await this.postService.getPostList(postListDTO);
        return res.json({ postList });
    }

    async handleGetPost(req, res) {
        const postId = req.params.id;
        const post = await this.postService.getPost(postId);
        return res.json(post);
    }

    async handleCreatePost(req, res) {
        const postDTO = req.body;
        console.log(postDTO);
        const post = await this.postService.createPost(postDTO);
        return res.status(StatusCodes.CREATED).json(post);
    }

    async handleUpdatePost(req, res) {
        const content = req.body.content;
        const id = req.params.id;
        await this.postService.updatePost({ content, id });
        return res.json({ message: "게시글이 수정되었습니다." });
    }

    async handleDeletePost(req, res) {
        const postId = req.params.id;
        await this.postService.deletePost(postId);
        return res.json({ message: "게시글이 삭제되었습니다." });
    }
};

module.exports = PostController;