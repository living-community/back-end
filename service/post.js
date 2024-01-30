const postCategory = require("../enums/post_category");
const BadRequest = require("../error/bad-request");
const NotFound = require("../error/not-found");
const Unauthorized = require("../error/unauthorized");

class PostService {
    constructor(container) {
        this.postModel = container.get("PostModel");
        this.userModel = container.get("UserModel");
    }
    
    async getPostList(postListDTO) {
        const decodedCategory = decodeURIComponent(postListDTO.category);
        const category = postCategory[decodedCategory];

        const postList = await this.postModel.findAll({
            where: { category },
            include: [{
                model: this.userModel,
                attributes: ["nickname"],
            }],
            offset: (postListDTO.page - 1) * postListDTO.limit,
            limit: postListDTO.limit,
            attributes: ["id", "title", "createdAt", "views", "likes"],
        });

        return postList;
    }

    async getPost(postId) {
        const post = await this.postModel.findOne({
            where: {id: postId},
        });

        if (!post) throw new NotFound("게시글을 찾을 수 없습니다.");

        this.postModel.update({
            views: post.views + 1,    
        }, {
            where: { id: postId },
        });

        return post;
    }

    async createPost(postDTO) {
        const user = await this.userModel.findOne({ where: { nickname: postDTO.writer }});
        if (!user) throw new Unauthorized("권한이 없습니다.");

        const category = postCategory[postDTO.category];
        const post = await this.postModel.create({
            title: postDTO.title,
            content: postDTO.content,
            category,
        });
        await user.addPost(post);

        return post;
    }

    async updatePost(postDTO) {
        const affected = await this.postModel.update({
            content: postDTO.content,
        }, {
            where: { id: postDTO.id },
        });

        if (!affected[0]) throw new BadRequest("알 수 없는 오류가 발생했습니다.");

        return affected;
    }

    async deletePost(postId) {
        const foundPost = await this.postModel.findOne({ where: { id: postId } });
        if (!foundPost) throw new NotFound("게시글 삭제에 실패했습니다.");
        const result = await this.postModel.destroy({ where: { id: postId } });
        return result;
    }

};

module.exports = PostService;