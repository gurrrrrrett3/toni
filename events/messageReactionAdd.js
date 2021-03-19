module.exports = {
	name: 'messageReactionAdd',
	once: true,
	execute(reaction, user, client) {
		
		const menu = require("../modules/reactionmenu")

		menu.reactionUpdate(reaction)
	}
}