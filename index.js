import express from 'express';
import bodyParser from 'body-parser';
import Route from './mvc/routes/route';
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Andela Cycle 35 Bootcamp Project - Stackoverflow Lite');
})

Route(app);

// PORT
const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

export default server;