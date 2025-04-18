import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors'
import router from './app/routes';
import httpStatus from "http-status";
import cookieParser from 'cookie-parser'
import { globalErrorHandler } from './app/middlewares/globalErrorHandler';

const app: Application = express();

app.use(express.json());
app.use(cors())
app.use(cookieParser())

app.use('/api/v1', router)
app.use(globalErrorHandler)

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'Ph health care server is running'
    })
})


app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Not Found',
        errorMessages: [
            {
                path: req.originalUrl,
                message: 'API Not Found'
            }
        ]
    })
    next()
})

export default app
