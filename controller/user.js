const { StatusCodes } = require("http-status-codes");

class UserController {
    constructor(container) {
        this.userService = container.get("UserService");
    }

    async handleGetUser(req, res) {
        const nickname = req.params.nickname;
        const userDTO = await this.userService.getUser(nickname);
        return res.json(userDTO);
    }

    async handleCreateUser(req, res) {
        const userReqDTO = req.body;
        const userResDTO = await this.userService.createUser(userReqDTO);
        return res.status(StatusCodes.CREATED).json(userResDTO);
    }

    async handleUpdateUser(req, res) {
        const nickname = req.params.nickname;
        const userReqDTO = req.body;
        await this.userService.updateUser(nickname, userReqDTO);
        return res.json({message: "회원 정보가 수정되었습니다."});
    }
    
    async handleDeleteUser(req, res) {
        const nickname = req.params.nickname;
        await this.userService.deleteUser(nickname);
        return res.json({message: "삭제되었습니다."});
    }
};

module.exports = UserController