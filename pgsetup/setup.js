import db from "../db/index";

const createUsers = `
CREATE TABLE users (
    userid serial PRIMARY KEY NOT NULL,
    userfullname VARCHAR(50) NOT NULL,
    useremail VARCHAR(50) NOT NULL,
    userpassword VARCHAR(100) NOT NULL,
    userdate TIMESTAMP DEFAULT Now()
)`;

const createQuestions = `
CREATE TABLE questions (
    questionid serial PRIMARY KEY NOT NULL,
    questiontitle VARCHAR(100) NOT NULL,
    questionbody TEXT NOT NULL,
    questionuser INT NOT NULL,
    questiondate TIMESTAMP DEFAULT Now()
)`;

const createAnswers = `
CREATE TABLE answers (
    answersid serial PRIMARY KEY NOT NULL,
    answersreply TEXT NOT NULL,
    answersquestion INT NOT NULL,
    answersuser INT NOT NULL,
    answersqowner INT NOT NULL,
    answersdate TIMESTAMP DEFAULT Now()
)`;

db.connect((err, client, done) => {
    if (err) throw err
    client.query(createUsers, (err, res) => {
        done()

        if (err) {
        console.log(`Users table not created succesfully`)
        } else {
        console.log(`Users table created successfully`)
        }
    })
})

db.connect((err, client, done) => {
    if (err) throw err
    client.query(createQuestions, (err, res) => {
        done()

        if (err) {
        console.log(`Questions table not created succesfully`)
        } else {
        console.log(`Questions table created successfully`)
        }
    })
})

db.connect((err, client, done) => {
    if (err) throw err
    client.query(createAnswers, (err, res) => {
        done()

        if (err) {
        console.log(`Answers table not created succesfully`)
        } else {
        console.log(`Answers table created successfully`)
        }
    })
})