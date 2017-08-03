const fs = require('fs')
const getSafely = require('safe-access')

var credentialsJson = null

const CREDENTIALS_JSON_FILE = './config/credentials.json'

const defaultCredentials = {
    username: 'a',
    password: 'b'
}

try {
	credentialsJson = JSON.parse(fs.readFileSync(CREDENTIALS_JSON_FILE).toString())
} catch(e) {
	console.info('Could not load credentials.json file. Trying to get config from other place')
	console.log(e)
}


console.log('@1:')
console.log(process.env.VCAP_SERVICES)

const fromFile = {
	conversation:  function() {
	    const c = getSafely(credentialsJson, 'watsonConversation.credentials')

	    console.log('@2: ' + c)
        return c
	},

	discovery: function() {
	    const c = getSafely(credentialsJson, 'watsonDiscovery.credentials')

	    console.log('@3: ' + c)
        return c
	},

	rnr: function() {
        return getSafely(credentialsJson, 'watsonRetreiveAndRank.credentials')
	}
}

const VCAP_SERVICES = process.env.VCAP_SERVICES && JSON.parse(process.env.VCAP_SERVICES)

const fromBluemixEnv = {
    conversation: function() {
        return getSafely(VCAP_SERVICES, 'conversation[0].credentials')
    },

    discovery: function() {
        return getSafely(VCAP_SERVICES, 'discovery[0].credentials')
    },

    rnr: function() {
        return getSafely(VCAP_SERVICES, 'retrieve_and_rank[0].credentials')
    }
}

const credentials = {
    conversation: function() {
        return fromFile.conversation() || fromBluemixEnv.conversation() || defaultCredentials
    },

    discovery: function() {
         return fromFile.discovery() || fromBluemixEnv.discovery() || defaultCredentials
    },

    rnr: function() {
         return fromFile.rnr() || fromBluemixEnv.rnr() || defaultCredentials
    }
}

module.exports = credentials