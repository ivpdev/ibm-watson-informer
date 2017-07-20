let WatsonConversationService = require('../services/WatsonConversationService')
let WatsonDiscoveryService = require('../services/WatsonDiscoveryService')

let DialogService = {
	tell: function(msg) {
		var self = this;

		return WatsonConversationService
    		.sendMessage(msg)
    		.then(watsonResponse => self._resolveWatsonResponse(watsonResponse))},

	_resolveWatsonResponse: function(watsonResponse) {
		let askWhichSoftIsUsedWithWatson = watsonResponse.intents.find(i => i.intent == 'whichSoftwareUsedWithWatson' && i.confidence > 0.5 )

		if (askWhichSoftIsUsedWithWatson) {
		    return WatsonDiscoveryService.getSoftwareUsedWithWatson()
		} else {
		    return new Promise((resolve, reject) => {
		        resolve(watsonResponse.output.text[0]) })}}}

module.exports = DialogService;