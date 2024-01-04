const SocketIO = require("socket.io");

module.exports = (server, app, middleware) => {
    const io = SocketIO(server, { path: '/socket.io' });
    app.set("io", io);
    const room = io.of("/room");
    const chat = io.of("/chat");

    // auth middleware 사용 설정 추가 예정
    
    // socket handler
    room.on("connection", (socket) => {
        console.log("room 네임스페이스에 접속");
        socket.on("disconnect", () => {
            console.log("room 네임스페이스 접속 해제");
        });
    });

    chat.on("connection", (socket) => {
        console.log("chat 네임스페이스에 접속");
        socket.on("disconnect", () => {
            console.log("chat 네임스페이스 접속 해제");
        });
    });

};