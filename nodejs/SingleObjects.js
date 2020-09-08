import userRepositoryDomain from "./Domains/UserRepository.js";
const UserRepository = new userRepositoryDomain();

import roomRepositoryDomain from "./Domains/RoomRepository.js";
const RoomRepository = new roomRepositoryDomain();

// module.exports.UserRepository = UserRepository;
// module.exports.RoomRepository = RoomRepository;
export { UserRepository, RoomRepository };
