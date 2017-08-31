const db = require('../db/models')

module.exports = {
  vote,
  updateVote
}

/**
*
*/
function vote(voteObj) {
	return db.vote
		.findOrCreate({
			where: {
				userId: voteObj.userId,
				quizId: voteObj.quizId
			},
			defaults: voteObj
		}).spread((result, created) => {
			if (created) {
				console.log('CREATEEEEED')
				return { vote: result, created }
			} else {
				return db.vote
					.update(
						{
							stars: voteObj.stars
						},
						{
							where: {
								userId: voteObj.userId,
								quizId: voteObj.quizId
							}
						}
					)
					.then(result => {
						if (result[0] === 1) {
							return db.vote
								.find({
									where: {
										userId: voteObj.userId,
										quizId: voteObj.quizId
									}
								})
								.then(update => {
									return [update.dataValues, created]
								})
						} else {
							return [{ error: true, msg: 'failed to update vote' }, created]
						}
					})
			}
		})
		.catch(err => {
			// Catch foreign constraint errors
			console.log(`ERROR in making vote ${err}`)
			return [{ error: true, msg: err }, false]
		})
}



/**
*
*/
function updateVote(voteObj) {
	/**
   * @return ex. { vote: { stars: 5, quizId: 1, userId: -1 }, updated: false }
   * @return ex. { vote: { stars: 5, quizId: 1, userId: 1 }, updated: true }
   */
	const { quizId, userId } = voteObj
	delete voteObj.quizId
	delete voteObj.userId
	return db.vote
		.update(voteObj, {
			where: {
				quizId,
				userId
			}
		})
		.then(result => {
			voteObj.quizId = quizId
			voteObj.userId = userId
			return result[0]
				? { vote: voteObj, updated: true }
				: { vote: voteObj, updated: false }
		})
}