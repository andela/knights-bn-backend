import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import bodyParser from 'body-parser';
import swaggerDefinition from './docs/swaggerDefinition';
import users from './routes/users';


const app = express();

const newSwaggerDef = {
  swaggerDefinition,
  apis: [`${__dirname}/models/*.js`, `${__dirname}/routes/*.js`],
};

const swaggerSpec = swaggerJsDoc(newSwaggerDef);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1/app', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', users);

app.use((req, res) => {
  res.status(404).send({
    status: 404,
    error: 'Not Found!',
  });
});
export default app;
