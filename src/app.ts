import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import swaggerUI from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
import basicAuth from 'express-basic-auth';

import taskRoutes from './routes/tasks.routes';
import { options } from './swaggerOptions';

process.env.APP_ENV = process.env.APP_ENV || 'development';
dotenv.config({
    path: `${__dirname}/../config/${process.env.APP_ENV}.env`
});



const app = express();

app.set('port', process.env.port || 3000)

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

const specs = swaggerJSDoc(options);

app.use(taskRoutes);

app.use("/api-docs", basicAuth({
    users: {'test': 'test'},
    challenge: true,
}), swaggerUI.serve, swaggerUI.setup(specs));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs))

export default app;