import express from 'express';
import bodyParser from 'body-parser';
import Route from './mvc/routes/route';
import dbConfig from './db/index';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Andela Cycle 35 Bootcamp Project - Stackoverflow Lite');
})

const text = 'INSERT INTO user (userid, userfullname, useremail, userpassword) VALUES($1, $2, $3, $4) RETURNING *';
const values = [1,'Daniel Lamarr', 'danielchidiebele@gmail.com', 'qwerty'];

dbConfig.query(text, values, (err, res) => {
  if (err) {
    console.log(err.stack)
  } else {
    console.log(res.rows[0])
  }
})

Route(app);

// PORT
const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

export default server;