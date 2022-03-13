import { NextFunction, Request, Response } from "express";
import { CreateSessionDTO } from "../dtos/session.dto";
import { Session } from "../interfaces/session.interface";
import SessionService from "../services/session.service";

class SessionController {
    public SessionService = new SessionService()

    public getSessions = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllSessionsData: Session[] = await this.SessionService.findAllSessions()

            return res.status(200).json({
                data: findAllSessionsData
            })
        } catch (error) {
            next(error)
        }
    }

    public getSingleSession = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const SessionId = Number(req.params.id)
            const findSingleSessionData = await this.SessionService.findSessionById(SessionId)

            return res.status(200).json({
                data: findSingleSessionData
            })
        } catch (error) {
            next(error)
        }
    }

    public addSession = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const SessionData: CreateSessionDTO = req.body
            const createSessionData: Session = await this.SessionService.createSession(SessionData)

            return res.status(200).json({
                data: createSessionData
            })
        } catch (error) {
            next(error)
        }
    }

    public updateSession = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const SessionId = Number(req.params.id)
            const SessionData: CreateSessionDTO = req.body
            const updateSession: Session = await this.SessionService.updateSession(SessionId, SessionData)

            return res.status(200).json({
                data: updateSession
            })
        } catch (error) {
            next(error)
        }
    }

    public deleteSession = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const SessionId = Number(req.params.id)
            const deleteSessionData = await this.SessionService.deleteSession(SessionId)

            return res.status(200).json({
                data: deleteSessionData
            })
        } catch (error) {
            next(error)
        }
    }
}

export default SessionController