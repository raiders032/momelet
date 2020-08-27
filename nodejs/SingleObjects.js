const userRepositoryDomain = require("./Domains/UserRepository");
const UserRepository = new userRepositoryDomain.UserRepository();

const roomRepositoryDomain = require("./Domains/RoomRepository");
const RoomRepository = new roomRepositoryDomain.RoomRepository();

module.exports.UserRepository = UserRepository;
module.exports.RoomRepository = RoomRepository;
