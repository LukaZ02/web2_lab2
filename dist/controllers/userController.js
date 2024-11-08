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
exports.UserController = void 0;
const userRepository_1 = require("../repositories/userRepository");
class UserController {
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, agreeTerms } = req.body;
                const currentTime = Date.now();
                if (UserController.lockoutEndTime && currentTime >= UserController.lockoutEndTime) {
                    UserController.lockoutEndTime = null; // Clear lockout
                    UserController.loginAttempts = 0; // Reset attempts
                }
                if (UserController.lockoutEndTime && currentTime < UserController.lockoutEndTime) {
                    const lockoutSeconds = Math.ceil((UserController.lockoutEndTime - currentTime) / 1000);
                    return res.render('brokenauth', { title: 'Broken Authentication', user: null, attempt: null, lockout: lockoutSeconds });
                }
                if (!agreeTerms) {
                    yield UserController.resetAdmin();
                }
                else {
                    yield UserController.changeUserAndPass();
                }
                const user = yield UserController.userRepository.getUser(username, password);
                if (user) {
                    res.render('brokenauth', { title: 'Broken Authentication', user: user, attempt: null, lockout: null });
                    UserController.loginAttempts = 0;
                    UserController.lockoutEndTime = null;
                }
                else {
                    if (agreeTerms) {
                        UserController.loginAttempts++;
                        if (UserController.loginAttempts >= 3) {
                            UserController.lockoutEndTime = Date.now() + 60000; // Lockout for 1 minute
                            const lockoutSeconds = Math.floor((UserController.lockoutEndTime - currentTime) / 1000);
                            return res.render('brokenauth', { title: 'Broken Authentication', user: null, attempt: 0, lockout: lockoutSeconds });
                        }
                        res.render('brokenauth', { title: 'Broken Authentication', user: null, attempt: 3 - UserController.loginAttempts, lockout: null });
                    }
                    else {
                        res.render('brokenauth', { title: 'Broken Authentication', user: null, attempt: null, lockout: null });
                    }
                }
            }
            catch (error) {
                res.status(500).send();
            }
        });
    }
    static resetAdmin() {
        return __awaiter(this, void 0, void 0, function* () {
            yield UserController.userRepository.removeUser('lz54251');
            yield UserController.userRepository.addUser('admin', 'password');
        });
    }
    static changeUserAndPass() {
        return __awaiter(this, void 0, void 0, function* () {
            yield UserController.userRepository.removeUser('admin');
            yield UserController.userRepository.addUser('lz54251', 'fer_is_being_renovated');
        });
    }
}
exports.UserController = UserController;
UserController.userRepository = new userRepository_1.UserRepository();
UserController.loginAttempts = 0;
UserController.lockoutEndTime = null;
