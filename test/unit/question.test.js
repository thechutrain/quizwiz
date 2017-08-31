'use strict'
/* global it, describe, before */
const assert = require('chai').assert
const expect = require('chai').expect

const models = require('../../server/db/models')
const checkEmptyDatabase = require('../helper').checkEmptyDatabase
const userQuery = require('../../server/queryAPI').userQuery
const quizQuery = require('../../server/queryAPI').quizQuery
const questionQuery = require('../../server/queryAPI').questionQuery

const title =
`
===============================
Unit test on "question" model
===============================
`

const quiz1 = {
  title: 'US History Testing Quiz',
  description: 'A quiz on the history of the United States',
  madeBy: 1
}

const user1 = {
  username: 'I_am_a_test',
  password: 'incorrect'
}

const question1 = {
  quizId: 1,
  question: 'What question number is this?',
  choices: ['One', 'Two', 'Three'],
  correctAnswer: 0
}

const question2 = {
  quizId: 1,
  question: 'Is this question number 2?',
  choices: ['No', 'Yes'],
  correctAnswer: 1
}

describe(title, () => {
  before(() => {
    return models.sequelize.sync({ force: true })
    .then(() => {
      checkEmptyDatabase()  
    })
    .then(() => {
      // 3. add data into other tables HERE
      return userQuery.createUser(user1)
    })
    .then((queryPromise) => {
      // 4. check that all insertions worked!
      assert.isTrue(queryPromise[1], 'user should be created')
      return quizQuery.createQuiz(quiz1)
    })
    .then((newQuiz) => {
      assert.isTrue(newQuiz[1], 'quiz should be created')
    })
  })
    /** ================== Actual Tests Begin Here ========================
   *
   */
  it('should be able add a question to quiz 1', (done) => {
    questionQuery.createQuestion(question1).then((r) => {
      const result = JSON.parse(JSON.stringify(r))
      // console.log(result)
      // console.log(typeof result.choices) // object!
      expect(result).to.include.keys([
        'id', 'question', 'choices', 'correctAnswer', 'quizId', 'updatedAt'
      ])
      done()
    })
  })

  it('should be able to add another question to quiz 1', (done) => {
    questionQuery.createQuestion(question2).then((r) => {
      const result = JSON.parse(JSON.stringify(r))
      // console.log(result)
      expect(result).to.include.keys([
        'id', 'question', 'choices', 'correctAnswer', 'quizId', 'updatedAt'
      ])
      done()
    })
  })

  it('should be able to find both questions of quiz 1', (done) => {
    // done()
    quizQuery.findQuizById(1).then((rawResult) => {
      const result = JSON.parse(JSON.stringify(rawResult))
      // console.log(result)
      expect(result.questions).to.have.lengthOf(2)
      done()
    })
  })
})
