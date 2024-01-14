const Conflict = require("../error/conflict");
const NotFound = require("../error/not-found");

class UserService {
    constructor(container) {
        this.userModel = container.get("UserModel");
    }

    async getUser(userId) {
        const user = await this.userModel.findOne({
            id: userId,
        });

        if (!user) throw new NotFound("회원을 찾을 수 없습니다.");

        const userDTO = {
            id: user.id,
            nickname: user.nickname,
            address: user.address,
            email: user.email,
            created_at: user.created_at,
        };
        
        return userDTO;
    }

    async createUser(userDTO) {
        const foundUser = await this.userModel.findOne({nickname: userDTO.nickname});
        if (foundUser) throw new Conflict("해당 닉네임이 이미 존재합니다.");
        const user = await this.userModel.create(userDTO);
        const userResDTO = {
            id: user.id,
            nickname: user.nickname,
            address: user.address,
            email: user.email,
            created_at: user.created_at
        };
        return userResDTO;
    }

    async updateUser(userId, userDTO) {
        const affected = await this.userModel.update({
            nickname: userDTO.nickname,
            password: userDTO.password,
        }, {
            where: {id: userId},
        });

        console.log(affected);

        if (!affected[0]) throw new NotFound("회원 정보 수정에 실패했습니다.");

        return affected;
    }

    async deleteUser(userId) {
        const result = await this.userModel.destroy({ where: {id: userId} });
        if (!result) throw new NotFound("회원 삭제에 실패했습니다.");
        return result;
    }
};

module.exports = UserService;