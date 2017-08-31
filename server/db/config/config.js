var match
if (process.env.DATABASE_URL) {
	match = process.env.DATABASE_URL.match(
		/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/
	)
} else {
	match = 'abcdefg'.split('') // junk array so I don't get error with undefined match[4]
}

module.exports = {
	development: {
		username: 'alanchu',
		password: '',
		database: 'quizwiz_v3_db',
		host: '127.0.0.1',
		dialect: 'postgres'
	},
	test: {
		username: 'alanchu',
		password: '',
		database: 'quizwiz_testing_db',
		host: '127.0.0.1',
		dialect: 'postgres',
		logging: false
	},
	travisTest: {
		username: 'postgres',
		password: null,
		database: 'quizwiz_travis_db',
		host: '127.0.0.1',
		dialect: 'postgres'
	},
	production: {
		database: match[5],
		username: match[1],
		password: match[2],
		host: match[3],
		dialect: 'postgres',
		port: match[4],
		dialectOptions: {
			ssl: true
		}
	}
}
