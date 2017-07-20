var ConversationV1 = require('watson-developer-cloud/conversation/v1')
var config = require('../config.js')

let credentials = config.getWatsonConversationCredentials()

var conversation = new ConversationV1({
  username: credentials.username,
  password: credentials.password,
  version_date: ConversationV1.VERSION_DATE_2017_04_21
});


let WatsonConversationService = {
	sendMessage: function(msg) {
		return new Promise((resolve, reject) => {
            conversation.message({
                input: { text: msg },
                workspace_id: config.getWatsonConversationWorkspaceId()
            }, function(err, response) {
                if (err) {
                    console.error(err);
                } else {
                    resolve(response);
                }
         });});
	}
}

module.exports = WatsonConversationService;