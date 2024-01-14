const { StatusCodes } = require("http-status-codes");

class UserController {
    constructor(container) {
        this.userService = container.get("UserService");
        console.log(this.userService);
        console.log(this);
    }

    async handleGetUser(req, res) {
        const userId = req.params.id;
        const userDTO = await this.userService.getUser(userId);
        return res.status(StatusCodes.OK).json(userDTO);
    }

    async handleCreateUser(req, res) {
        const userReqDTO = req.body;
        console.log(this);
        const userResDTO = await this.userService.createUser(userReqDTO);
        return res.status(StatusCodes.CREATED).json(userResDTO);
    }

    async handleUpdateUser(req, res) {
        const userId = req.params.id;
        const userReqDTO = req.body;
        await this.userService.updateUser(userId, userReqDTO);
        return res.json({message: "회원 정보가 수정되었습니다."});
    }
    
    async handleDeleteUser(req, res) {
        const userId = req.params.id;
        await this.userService.deleteUser(userId);
        return res.json({message: "삭제되었습니다."});
    }
};

module.exports = UserController