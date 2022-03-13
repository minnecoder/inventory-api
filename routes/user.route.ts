import { Router } from "express";
import { threadId } from "worker_threads";
import UserController from "../controllers/user.controller";
import { CreateUserDTO } from "../dtos/user.dto";
import { Route } from "../interfaces/route.interface";
import validationMiddleware from "../middleware/validation.middleware";

class UserRoute implements Route {
    public path = '/users'
    public router = Router()
    public UserController = new UserController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.UserController.getUsers)
        this.router.get(`${this.path}/:id`, this.UserController.getSingleUser)
        this.router.post(`${this.path}`, validationMiddleware(CreateUserDTO), this.UserController.registerUser)
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateUserDTO, true), this.UserController.updateUser)
        this.router.delete(`${this.path}/:id`, this.UserController.deleteUser)
        this.router.post(`${this.path}/login`, this.UserController.loginUser)
        this.router.post(`${this.path}/validate`, this.UserController.validateEmail)
        this.router.post(`${this.path}/logout`, this.UserController.logoutUser)
    }
}

export default UserRoute