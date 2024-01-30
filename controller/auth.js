const Unauthorized = require("../error/unauthorized");

class AuthController {
    constructor(container) {
        this.authService = container.get("AuthService");
        this.config = container.get("config").jwt;
    }

    async authToken(req, res, next) {
        const decodedAccess = this.authService.verifyAccessToken(req.cookies.authorization, this.config.secret);
        if (!decodedAccess) { 
            const userId = await this.authService.verifyRefreshToken(req.cookies.refresh, this.config.secret);
            if (!userId)
                throw new Unauthorized("권한이 없습니다.");
            const { accessToken, refreshToken } = await this.authService.generateTokens(userId, this.config);
            res.cookie("authorization", accessToken, { httpOnly: true });
            res.cookie("refresh", refreshToken, { httpOnly: true });
        }
        return next();
    }

    async login(req, res) {
        const { nickname, password } = req.body;
        const { accessToken, refreshToken } = await this.authService.login(nickname, password, this.config);
        res.cookie("authorization", accessToken, { httpOnly: true });
        res.cookie("refresh", refreshToken, { httpOnly: true });
        return res.json({ message: "로그인에 성공하였습니다." });
    }

    async logout(req, res) {
        await this.authService.logout(req.cookies.refresh);
        res.clearCookie("authorization");
        res.clearCookie("refresh");
        return res.json({ message: "로그아웃하셨습니다." });
    }
};

module.exports = AuthController;