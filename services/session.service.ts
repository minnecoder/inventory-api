import DB from "../config/postgres-db";
import { CreateSessionDTO } from "../dtos/session.dto";
import { Session } from "../interfaces/session.interface";
import { NotFound } from "../errors/NotFound";
import { AlreadyExists } from "../errors/AlreadyExists";

class SessionService {
    public Session = DB.Session

    public async findAllSessions(): Promise<Session[]> {
        const allSessions: Session[] = await this.Session.findAll()
        return allSessions
    }

    public async findSessionById(SessionId: number): Promise<Session> {
        const singleSession: Session = await this.Session.findByPk(SessionId)

        if (!singleSession) throw new NotFound('Session')

        return singleSession
    }

    public async createSession(SessionData: CreateSessionDTO): Promise<Session> {
        const findSession: Session = await this.Session.findOne({ where: { id: SessionData.id } })

        if (findSession) throw new AlreadyExists('Session')

        const createdSessionData: Session = await this.Session.create({ ...SessionData })

        return createdSessionData
    }

    public async updateSession(SessionId: number, SessionData: CreateSessionDTO): Promise<Session> {
        const findSession: Session = await this.Session.findOne({ where: { id: SessionData.id } })

        if (!findSession) throw new NotFound('Session')

        await this.Session.update({ ...SessionData }, { where: { id: SessionId } })

        const updatedSession = await this.Session.findByPk(SessionId)

        return updatedSession
    }

    public async deleteSession(SessionId: number): Promise<Session> {
        const findSession: Session = await this.Session.findByPk(SessionId)

        await this.Session.destroy({ where: { id: SessionId } })

        return findSession
    }
}

export default SessionService