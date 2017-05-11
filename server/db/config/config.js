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
    // 'use_env_variable': process.env.DATABASE_URL,
    'host': 'ec2-54-225-236-102.compute-1.amazonaws.com',
    'database': 'd87vadfblg4tmg',
    'username': 'hijqmferltimrk',
    'password': '8b3845e64af86f77addde119cd852a25e3ab58e3c8545b696087caa96a33a85d',
    'dialect': 'postgres',
    'port': 5432,
    'protocol': null,
    'ssl': true,
    'dialectOptions': {
      'ssl': { 'required': true }
    }
  }
}
