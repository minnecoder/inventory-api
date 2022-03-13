import cookieParser from "cookie-parser";
import cors from 'cors'
import express from 'express'
import hpp from 'hpp'
import DB from './config/postgres-db'
import { Route } from './interfaces/route.interface'
import swaggerUI from "swagger-ui-express";
import swaggerDoc from "./swagger/swagger-compiled.json";
import errorMiddleware from './middleware/error.middleware';

class App {
    public app: express.Application
    public port: string | number
    public env: string

    constructor(routes: Route[]) {
        this.app = express()
        this.port = process.env.PORT || 4000
        this.env = process.env.NODE_ENV || "development"

        this.connectToDB()
        this.initializeMiddleware()
        this.initializeRoutes(routes)
        this.initializeSwagger()
        this.initializeErrorHandling()
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log("***************************************")
            console.log(`********** ENV: ${this.env} ***********`)
            console.log(`****** Server running on port ${this.port} ****`)
            console.log("***************************************")
        })
    }

    public getServer() {
        return this.app
    }

    private connectToDB() {
        DB.sequelize.sync({ force: false })
    }

    private initializeMiddleware() {
        this.app.use(cors())
        this.app.use(hpp())
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(cookieParser())
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware)
    }

    private initializeRoutes(routes: Route[]) {
        routes.forEach(route => {
            this.app.use('/api/v1/', route.router)
        })
    }

    private initializeSwagger() {
        this.app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc))
    }
}

export default App