import {UserRepository} from "../repositories/userRepository";
import {Request, Response} from "express";

export class UserController {
    private static userRepository = new UserRepository();
    private static loginAttempts = 0;
    private static lockoutEndTime: number | null = null;

    public static async login(req: Request, res: Response) {
        try {
            const { username, password, agreeTerms } = req.body;
            const currentTime = Date.now();

            // Check if lockout has expired
            if (UserController.lockoutEndTime && currentTime >= UserController.lockoutEndTime) {
                UserController.lockoutEndTime = null; // Clear lockout
                UserController.loginAttempts = 0; // Reset attempts
            }

            // If the user is still locked out, calculate the remaining time
            if (UserController.lockoutEndTime && currentTime < UserController.lockoutEndTime) {
                const lockoutSeconds = Math.ceil((UserController.lockoutEndTime - currentTime) / 1000);
                return res.render('brokenauth', { title: 'Broken Authentication', user: null, attempt: null, lockout: lockoutSeconds });
            }

            if (!agreeTerms) {
                await UserController.resetAdmin();
            } else {
                await UserController.changeUserAndPass();
            }

            const user = await UserController.userRepository.getUser(username, password);

            if (user) {
                res.render('brokenauth', { title: 'Broken Authentication', user: user, attempt: null, lockout: null });
                UserController.loginAttempts = 0;
                UserController.lockoutEndTime = null; // Reset lockout on successful login
            } else {
                if (agreeTerms) {
                    UserController.loginAttempts++;
                    if (UserController.loginAttempts >= 3) {
                        UserController.lockoutEndTime = Date.now() + 60000; // Lockout for 1 minute
                        const lockoutSeconds = Math.floor((UserController.lockoutEndTime - currentTime) / 1000);
                        return res.render('brokenauth', { title: 'Broken Authentication', user: null, attempt: 0, lockout: lockoutSeconds });
                    }
                    res.render('brokenauth', { title: 'Broken Authentication', user: null, attempt: 3 - UserController.loginAttempts, lockout: null });
                } else {
                    res.render('brokenauth', { title: 'Broken Authentication', user: null, attempt: null, lockout: null });
                }
            }
        } catch (error) {
            res.status(500).send();
        }
    }

    public static async resetAdmin() {
        await UserController.userRepository.removeUser('lz54251');
        await UserController.userRepository.addUser('admin', 'password');
    }

    private static async changeUserAndPass() {
        await UserController.userRepository.removeUser('admin');
        await UserController.userRepository.addUser('lz54251', 'fer_is_being_renovated');
    }
}