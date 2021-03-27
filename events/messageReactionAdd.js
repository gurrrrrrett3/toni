module.exports = {
	name: 'messageReactionAdd',
	once: false,
	execute(reaction, user, client) {
		
		const menu = require("../modules/reactionmenu")

		menu.reactionUpdate(reaction)
	}
}