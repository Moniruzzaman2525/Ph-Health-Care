import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors'
import router from './app/routes';
import httpStatus from "http-status";

const app: Application = express();

app.use(express.json());
app.use(cors())

app.use('/api/v1', router)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message || 'Something went wrong',
        error: err
    })
})

app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'Ph health care server is running'
    })
})

export default app
