let WatsonConversationService = require('../services/WatsonConversationService')
let WatsonDiscoveryService = require('../services/WatsonDiscoveryService')
let WatsonRetrieveAndRankService = require('../services/WatsonRetrieveAndRankService')

let DialogService = {
	tell: function(msg, context) {
		var self = this;

		return WatsonConversationService
    		.sendMessage(msg, context)
    		.then(watsonResponse => self._resolveWatsonResponse(watsonResponse))},

	_resolveWatsonResponse: function(watsonResponse) {
		let askWhichSoftIsUsedWithWatson =
		    !!watsonResponse.intents
		        .find(i => i.intent == 'whichSoftwareUsedWithWatson' && i.confidence > 0.5 ) //TODO based on visited nodes istead of intent

		let askRnR = watsonResponse.output.nodes_visited.includes('askRnR')

		if (askWhichSoftIsUsedWithWatson) {
		    return WatsonDiscoveryService
		                .getSoftwareUsedWithWatson()
		                .then(function(response) {
		                   return  { text: response, context: watsonResponse.context }})
		} else if (askRnR) {
		    return WatsonRetrieveAndRankService
		                .query(watsonResponse.input.text)
		                .then(response => {
		                    return { text: JSON.stringify(response, null, 4), context: watsonResponse.context }})
		} else {
		    return {
                text: watsonResponse.output.text[0],
                context: watsonResponse.context }}}}

module.exports = DialogService;