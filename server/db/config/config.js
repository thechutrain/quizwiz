module.exports = {
  'development': {
    'username': 'alanchu',
    'password': '',
    'database': 'quizwiz_db',
    'host': '127.0.0.1',
    'dialect': 'postgres'
  },
  'test': {
    'username': 'alanchu',
    'password': '',
    'database': 'quizwiz_testing_db',
    'host': '127.0.0.1',
    'dialect': 'postgres',
    'logging': false
  },
  'travisTest': {
    'username': 'postgres',
    'password': null,
    'database': 'quizwiz_travis_db',
    'host': '127.0.0.1',
    'dialect': 'postgres'
  },
  'production': {
    'use_env_variable': process.env.DATABASE_URL,
    'dialect': 'postgres',
    'port': 5432,
    'ssl': true,
    'dialectOptions': {
      'ssl': { 'required': true }
    }
  }
}
