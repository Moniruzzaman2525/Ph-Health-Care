import express, { Application, Request, Response } from 'express';
import cors from 'cors'
import { userRoutes } from './app/modules/User/user.routes';

const app: Application = express();

app.use(express.json());
app.use(cors())

app.use('/api/v1/user', userRoutes)


app.get('/', (req: Request, res: Response) => {
    res.send({
        message: 'Ph health care server is running'
    })
})

export default app
