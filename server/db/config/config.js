var match
if (process.env.DATABASE_URL) {
  match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)
} else {
  match = 'abcdefg'.split('')
}

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
    'database': match[5] || '',
    'username': match[1] || '',
    'password': match[2] || '',
    'host': match[3] || '',
    'dialect': 'postgres',
    'port': match[4] || '',
    dialectOptions: {
      ssl: true
    }
    // 'use_env_variable': process.env.DATABASE_URL
    // 'host': 'ec2-54-225-236-102.compute-1.amazonaws.com',
    // 'database': 'd87vadfblg4tmg',
    // 'username': 'hijqmferltimrk',
    // 'password': '8b3845e64af86f77addde119cd852a25e3ab58e3c8545b696087caa96a33a85d',
    // 'dialect': 'postgres',
    // 'port': 5432,
    // 'protocol': null,
    // 'ssl': true,
    // 'dialectOptions': {
    //   'ssl': { 'required': true }
    // }
  }
}
// postgres://hijqmferltimrk:8b3845e64af86f77addde119cd852a25e3ab58e3c8545b696087caa96a33a85d@ec2-54-225-236-102.compute-1.amazonaws.com:5432/d87vadfblg4tmg