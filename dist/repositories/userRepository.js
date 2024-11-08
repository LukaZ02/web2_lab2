"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const data_source_1 = require("../data-source");
const user_1 = require("../entities/user");
class UserRepository {
    constructor() {
        this.repository = data_source_1.AppDataSource.getRepository(user_1.User);
    }
    addUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = new user_1.User(username, password);
            return yield this.repository.save(user);
        });
    }
    removeUser(username) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.repository.delete({ username: username });
        });
    }
    getUser(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.repository.findOne({
                    where: {
                        username: username,
                        password: password
                    }
                });
            }
            catch (error) {
                return null;
            }
        });
    }
}
exports.UserRepository = UserRepository;
