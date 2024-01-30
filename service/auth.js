const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const NotFound = require("../error/not-found");
const BadRequest = require("../error/bad-request");

class AuthService {
    constructor(container) {
        this.tokenModel = container.get("TokenModel");
        this.userModel = container.get("UserModel");
    }

    verifyAccessToken(token, key) {
        try {
            const decoded = jwt.verify(token, key);
            return decoded;
        } catch {
            return null;
        }
    }

    async verifyRefreshToken(token, key) {
        try {
            const decoded = jwt.verify(token, key);
            const tokenInfo = await this.tokenModel.findOne({ 
                attributes: ["UserId"],
                where: { content: token }, 
            });
            return tokenInfo.UserId;
        } catch {
            return null;
        }
    }

    async login(nickname, password, config) {
        const user = await this.userModel.findOne({ where: { [Op.and]: [{ nickname }, { password }] }})
        if (!user) throw new NotFound("닉네임 또는 비밀번호가 틀렸습니다.");
        return await this.generateTokens(user.id, config);
    }

    async generateTokens(userId, config) {
        const accessOption = {
            algorithm: config.algorithm,
            expiresIn: config.accessExpiresIn,
        };
        const accessToken = jwt.sign({id: userId}, config.secret, accessOption);

        const refreshOption = {
            algorithm: config.algorithm,
            expiresIn: config.refreshExpiresIn,
        };
        const refreshToken = jwt.sign({}, config.secret, refreshOption);

        const foundToken = await this.tokenModel.findOne({ where: { UserId: userId } });
        if (foundToken) 
            this.tokenModel.update({ content: refreshToken }, { where: { UserId: userId } });
        else
            this.tokenModel.create({ content: refreshToken, UserId: userId });
        
        return { accessToken, refreshToken };
    }

    async logout(token) {
        const foundToken = await this.tokenModel.findOne({ where: { content: token } });
        if (!foundToken) throw new BadRequest("잘못된 요청입니다.");
        this.tokenModel.destroy({ where: { id: foundToken.id }});
        return;
    }
};

module.exports = AuthService;