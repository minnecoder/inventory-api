import { Router } from "express";
import SessionController from "../controllers/session.controller";
import { CreateSessionDTO } from "../dtos/session.dto";
import { Route } from "../interfaces/route.interface";
import validationMiddleware from "../middleware/validation.middleware";

class SessionRoute implements Route {
    public path = '/sessions'
    public router = Router()
    public SessionController = new SessionController()

    constructor() {
        this.initializeRoutes()
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.SessionController.getSessions)
        this.router.get(`${this.path}/:id`, this.SessionController.getSingleSession)
        this.router.post(`${this.path}`, validationMiddleware(CreateSessionDTO), this.SessionController.addSession)
        this.router.put(`${this.path}/:id`, validationMiddleware(CreateSessionDTO, true), this.SessionController.updateSession)
        this.router.delete(`${this.path}/:id`, this.SessionController.deleteSession)
    }
}

export default SessionRoute