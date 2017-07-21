let WatsonConversationService = require('../services/WatsonConversationService')
let WatsonDiscoveryService = require('../services/WatsonDiscoveryService')

let DialogService = {
	tell: function(msg, context) {
		var self = this;

		return WatsonConversationService
    		.sendMessage(msg, context)
    		.then(watsonResponse => self._resolveWatsonResponse(watsonResponse))},

	_resolveWatsonResponse: function(watsonResponse) {
		let askWhichSoftIsUsedWithWatson = !!watsonResponse.intents.find(i => i.intent == 'whichSoftwareUsedWithWatson' && i.confidence > 0.5 )

		let askRnR = watsonResponse.output.nodes_visited.includes('askRnR')

		if (askWhichSoftIsUsedWithWatson) {
		    return WatsonDiscoveryService
		                .getSoftwareUsedWithWatson()
		                .then(function(response) {
		                   return  { text: response, context: watsonResponse.context }})
		} else if (askRnR) {
		    return {
                text: 'in rnr!',
                context: watsonResponse.context }
		} else {
		    return {
                text: watsonResponse.output.text[0],
                context: watsonResponse.context }}}}

module.exports = DialogService;