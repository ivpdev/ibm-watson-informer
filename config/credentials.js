const fs = require('fs')
const getSafely = require('safe-access')

var credentialsJson = null

const CREDENTIALS_JSON_FILE = './config/credentials.json'

try {
	credentialsJson = JSON.parse(fs.readFileSync(CREDENTIALS_JSON_FILE).toString())
} catch(e) {
	console.info('Could not load credentials.json file. Trying to get config from other place')
	console.log(e)

}

const fromFile = {
	conversation:  function() {
        return getSafely(credentialsJson, 'watsonConversation.credentials')
	},

	discovery: function() {
        return getSafely(credentialsJson, 'watsonDiscovery.credentials')
	},

	rnr: function() {
        return getSafely(credentialsJson, 'watsonRetreiveAndRank.credentials')
	}
}


console.log('!!! process.env.VCAP_SERVICES')
console.log(process.env.VCAP_SERVICES)

const conversationConfig = getSafely(process.env, 'VCAP_SERVICES.conversation[0]')
const discoveryConfig = getSafely(process.env, 'VCAP_SERVICES.discovery[0]')
const rnrConfig = getSafely(process.env, 'VCAP_SERVICES.rnr[0]')

const fromBluemixEnv = {
    conversation: function() {
        return conversationConfig && conversationConfig.credentials
    },

    discovery: function() {
        return discoveryConfig.credentials
    },

    rnr: function() {
        return rnrConfig.credentials
    }
}

const credentials = {
    conversation: function() {
        return fromFile.conversation() || fromBluemixEnv.conversation()
    },

    discovery: function() {
         return fromFile.discovery() || fromBluemixEnv.discovery()
    },

    rnr: function() {
         return fromFile.rnr() || fromBluemixEnv.rnr()
    }
}

module.exports = credentials