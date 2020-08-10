const userRepositoryDomain = require("./Domains/UserRepository");
const UserRepository = new userRepositoryDomain.UserRepository();

module.exports.UserRepository = UserRepository;
