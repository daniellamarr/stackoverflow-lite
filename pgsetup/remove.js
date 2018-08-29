import db from "../db/index";

const removeUsers = `
DROP TABLE IF EXISTS users cascade
`;

const removeQuestions = `
DROP TABLE IF EXISTS questions cascade
`;

const removeAnswers = `
DROP TABLE IF EXISTS answers cascade
`;

db.connect((err, client, done) => {
    if (err) throw err
    client.query(removeUsers, (err, res) => {
        done()

        if (err) {
        console.log(`Users table not dropped succesfully`)
        } else {
        console.log(`Users table dropped successfully`)
        }
    })
})

db.connect((err, client, done) => {
    if (err) throw err
    client.query(removeQuestions, (err, res) => {
        done()

        if (err) {
        console.log(`Questions table not dropped succesfully`)
        } else {
        console.log(`Questions table dropped successfully`)
        }
    })
})

db.connect((err, client, done) => {
    if (err) throw err
    client.query(removeAnswers, (err, res) => {
        done()

        if (err) {
        console.log(`Answers table not dropped succesfully`)
        } else {
        console.log(`Answers table dropped successfully`)
        }
    })
})