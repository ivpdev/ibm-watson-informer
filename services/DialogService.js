
var WatsonConversationService = require('../services/WatsonConversationService')


let DialogService = {
	tell: function(msg) {
		var self = this;

		return WatsonConversationService
    		.sendMessage(msg)
    		.then(watsonResponse => self._resolveWatsonResponse(watsonResponse))
	},

	_resolveWatsonResponse: function(watsonResponse) {
		let askDiscovery = watsonResponse.intents.find(i => i.intent == 'greeting' && i.confidence > 0.5 )

		if (askDiscovery) {
			return 'opa'
		} else {
			return watsonResponse.output.text[0]
		}
	}
}

module.exports = DialogService;