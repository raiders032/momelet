const userRepositoryDomain = require("./Domains/UserRepository");
const UserRepository = new userRepositoryDomain.UserRepository();

const roomRepositoryDomain = require("./Domains/Roomrepository");
const RoomRepository = new roomRepositoryDomain.RoomRepository();

module.exports.app = app;
module.exports.server = server;
module.exports.io = io;
module.exports.UserRepository = UserRepository;
module.exports.RoomRepository = RoomRepository;
