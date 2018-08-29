import express from 'express';
import bodyParser from 'body-parser';
import Route from './mvc/routes/jwtroute';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.send('Andela Cycle 35 Bootcamp Project - Stackoverflow Lite');
})

// db.connect((err, client, done) => {
//   if (err) throw err
//   client.query('INSERT INTO users (userfullname, useremail, userpassword) VALUES($1, $2, $3) RETURNING *', ['Priscilla Sam', 'priscin@gmail.com', 'asdfghh'], (err, res) => {
//     done()

//     if (err) {
//       console.log('Bad');
//       console.log(err.stack)
//     } else {
//       console.log('Success');
//     }
//   })
// })

Route(app);

// PORT
const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`Listening on port ${port}`));

export default server;