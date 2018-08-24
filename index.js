import express from 'express';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());


// PORT
const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

export default server;